/**
 * footerWaveAnimation.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Faithful implementation of Stripe's 3D ribbon wave animation using Three.js.
 * Built directly from Stripe's mathematical folded geometry generator and GLSL shaders.
 * Supports multiple concurrent wave canvases (e.g. Hero, Footer, Cards).
 */

import * as THREE from "three";

interface WaveInstance {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  observer: ResizeObserver;
  onMouseMove: ((e: MouseEvent) => void) | null;
  raf: number | null;
  isPaused: boolean;
  timeOffset: number;
  pause: () => void;
  play: () => void;
  renderFrame: (customTime?: number) => void;
  captureScreenshot: (filename?: string) => string;
}

const instances: WaveInstance[] = [];
let sharedGeometry: THREE.BufferGeometry | null = null;
let sharedFallbackTexture: THREE.CanvasTexture | null = null;
let sharedWebpTexture: THREE.Texture | null = null;

// ─── Folded Geometry Generator (Extracted from Stripe's source) ───────────────
function createFoldedGeometry(
  width = 400,
  height = 400,
  subdivisionsX = 128,
  subdivisionsY = 256
): THREE.BufferGeometry {
  const halfW = width / 2;
  const halfH = height / 2;
  const gridX = subdivisionsX + 1;
  const gridY = subdivisionsY + 1;
  const stepX = width / subdivisionsX;
  const stepY = height / subdivisionsY;
  const vertexCount = gridX * gridY;

  const positions = new Float32Array(3 * vertexCount);
  const uvs = new Float32Array(2 * vertexCount);

  let d = 0;
  let m = 0;
  for (let y = 0; y < gridY; y += 1) {
    const posY = y * stepY - halfH;
    for (let x = 0; x < gridX; x += 1) {
      const posX = x * stepX - halfW;
      positions[d] = posX;
      positions[d + 1] = -posY;
      positions[d + 2] = 0;
      d += 3;
      uvs[m] = x / subdivisionsX;
      uvs[m + 1] = 1 - y / subdivisionsY;
      m += 2;
    }
  }

  const indices = new Uint32Array(subdivisionsX * subdivisionsY * 6);
  let idx = 0;
  for (let y = 0; y < subdivisionsY; y += 1) {
    for (let x = 0; x < subdivisionsX; x += 1) {
      const a = x + gridX * y;
      const b = x + gridX * (y + 1);
      const c = x + 1 + gridX * (y + 1);
      const d_idx = x + 1 + gridX * y;

      indices[idx] = a;
      indices[idx + 1] = b;
      indices[idx + 2] = d_idx;
      indices[idx + 3] = b;
      indices[idx + 4] = c;
      indices[idx + 5] = d_idx;
      idx += 6;
    }
  }

  // Quaternion rotation around an arbitrary unit axis
  function rotateAroundAxis(
    vec: { x: number; y: number; z: number },
    axis: { x: number; y: number; z: number },
    angle: number
  ) {
    const halfAngle = angle / 2;
    const s = Math.sin(halfAngle);
    const rx = axis.x * s;
    const ry = axis.y * s;
    const rz = axis.z * s;
    const rw = Math.cos(halfAngle);

    const qx = rw * vec.x + ry * vec.z - rz * vec.y;
    const qy = rw * vec.y + rz * vec.x - rx * vec.z;
    const qz = rw * vec.z + rx * vec.y - ry * vec.x;
    const qw = -rx * vec.x - ry * vec.y - rz * vec.z;

    return {
      x: qx * rw + -qw * rx + -qy * rz - -qz * ry,
      y: qy * rw + -qw * ry + -qz * rx - -qx * rz,
      z: qz * rw + -qw * rz + -qx * ry - -qy * rx,
    };
  }

  const axisX = { x: 1, y: 0, z: 0 };
  const axisY = { x: 0, y: 1, z: 0 };
  const count = positions.length / 3;

  for (let e = 0; e < count; e += 1) {
    const n = 3 * e;
    const i = 2 * e;
    let posX = positions[n];
    const posY = positions[n + 1];
    let posZ = positions[n + 2];
    const uvY = uvs[i + 1];

    const p = 4 - 2 * Math.pow(4 * uvY * (1 - uvY), 9.5);

    if (posX < -16) {
      posZ += p;
    } else if (posX < 16) {
      posZ = Math.cos(0 + ((posX - -16) * Math.PI) / 32) * p;
      const dVal = posX;
      const mVal = -Math.PI / 2;
      posX = Math.cos(mVal + ((dVal - -16) * Math.PI) / 32) * p - 16;
    } else {
      posZ -= p;
      posX = -posX;
    }

    let pt = { x: (posX += width / 4), y: posY, z: posZ };
    pt = rotateAroundAxis(pt, axisX, -Math.PI / 2);
    pt = rotateAroundAxis(pt, axisY, -Math.PI / 2);
    positions[n] = pt.x;
    positions[n + 1] = pt.y;
    positions[n + 2] = pt.z;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geom.setIndex(new THREE.BufferAttribute(indices, 1));
  geom.computeVertexNormals();

  return geom;
}

// ─── Fallback procedural palette texture ─────────────────────────────────────
function createFallbackPaletteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0.0, "rgb(82, 0, 255)");
    // grad.addColorStop(0.18, "rgb(115, 20, 235)");
    // grad.addColorStop(0.35, "rgb(160, 40, 195)");
    // grad.addColorStop(0.52, "rgb(195, 60, 150)");
    grad.addColorStop(0.68, "rgb(225, 85, 100)");
    grad.addColorStop(0.85, "rgb(242, 115, 55)");
    grad.addColorStop(1.0, "rgb(248, 136, 28)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function parseColorToVec3(colorStr: string, fallback: THREE.Vector3): THREE.Vector3 {
  if (colorStr.startsWith("#")) {
    const hex = colorStr.replace("#", "");
    if (hex.length === 6) {
      return new THREE.Vector3(
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255
      );
    }
  }
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return new THREE.Vector3(
      parseInt(match[1], 10) / 255,
      parseInt(match[2], 10) / 255,
      parseInt(match[3], 10) / 255
    );
  }
  return fallback;
}

// ─── GLSL Shaders (Stripe's exact vertex & fragment algorithms) ───────────────
const VERTEX_SHADER = /* glsl */ `
uniform float u_time;
uniform float u_speed;
uniform vec2 u_resolution;

uniform float u_twistFrequencyX;
uniform float u_twistFrequencyY;
uniform float u_twistFrequencyZ;

uniform float u_twistPowerX;
uniform float u_twistPowerY;
uniform float u_twistPowerZ;

uniform float u_displaceFrequencyX;
uniform float u_displaceFrequencyZ;
uniform float u_displaceAmount;

varying float v_time;
varying vec2 v_uv;
varying vec3 v_position;
varying vec4 v_clipPosition;
varying vec2 v_resolution;

#ifndef STRIPE_HASH
#define STRIPE_HASH
#if __VERSION__ >= 300
float xxhash(vec2 x) {
  uvec2 t = floatBitsToUint(x);
  uint h = 0xc2b2ae3du * t.x + 0x165667b9u;
  h = (h << 17u | h >> 15u) * 0x27d4eb2fu;
  h += 0xc2b2ae3du * t.y;
  h = (h << 17u | h >> 15u) * 0x27d4eb2fu;
  h ^= h >> 15u;
  h *= 0x85ebca77u;
  h ^= h >> 13u;
  h *= 0xc2b2ae3du;
  h ^= h >> 16u;
  return uintBitsToFloat(h >> 9u | 0x3f800000u) - 1.0;
}
vec2 hash(vec2 x) {
  float k = 6.283185307 * xxhash(x);
  return vec2(cos(k), sin(k));
}
#else
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
#endif
#endif

#ifndef STRIPE_SIMPLEX_NOISE
#define STRIPE_SIMPLEX_NOISE
float simplexNoise(in vec2 p) {
  const float K1 = 0.366025404; // (sqrt(3)-1)/2
  const float K2 = 0.211324865; // (3-sqrt(3))/6

  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));

  return dot(n, vec3(32.99));
}
#endif

#ifndef STRIPE_SHAPING
#define STRIPE_SHAPING
float expStep(float x, float n) {
  return exp2(-exp2(n) * pow(x, n));
}
#endif

#ifndef STRIPE_UTILS
#define STRIPE_UTILS
mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat4(
    oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s, 0.0,
    oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0,
    oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
}
#endif

vec3 displace(vec2 uv, vec3 pos, float time, float freqX, float freqZ, float amount) {
  float noise = simplexNoise(vec2(pos.x * freqX + time, pos.z * freqZ + time));
  pos.y += amount * noise;
  return pos;
}

void main(void) {
  v_time = u_time;
  v_uv = uv;
  v_resolution = u_resolution;

  mat4 rotA = rotationMatrix(vec3(0.5, 0.0, 0.5), u_twistFrequencyY * expStep(v_uv.x, u_twistPowerY));
  mat4 rotB = rotationMatrix(vec3(0.0, 0.5, 0.5), u_twistFrequencyX * expStep(v_uv.y, u_twistPowerX));
  mat4 rotC = rotationMatrix(vec3(0.5, 0.0, 0.5), u_twistFrequencyZ * expStep(v_uv.y, u_twistPowerZ));

  vec3 displacedPosition = displace(uv, position.xyz, u_time * u_speed, u_displaceFrequencyX, u_displaceFrequencyZ, u_displaceAmount);

  v_position = displacedPosition;
  v_position = (vec4(v_position, 1.0) * rotA).xyz;
  v_position = (vec4(v_position, 1.0) * rotB).xyz;
  v_position = (vec4(v_position, 1.0) * rotC).xyz;

  v_clipPosition = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
  gl_Position = v_clipPosition;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

varying float v_time;
varying vec2 v_uv;
varying vec3 v_position;
varying vec4 v_clipPosition;
varying vec2 v_resolution;

uniform vec2 u_mousePosition;
uniform vec3 u_clearColor;
uniform sampler2D u_paletteTexture;

uniform float u_colorSaturation;
uniform float u_colorContrast;
uniform float u_colorHueShift;

uniform float u_lineAmount;
uniform float u_lineThickness;
uniform float u_lineDerivativePower;
uniform float u_maxWidth;

#ifndef STRIPE_COLOR
#define STRIPE_COLOR
vec3 contrast(in vec3 v, in float a) {
  return (v - 0.5) * a + 0.5;
}

vec3 desaturate(vec3 color, float factor) {
  vec3 lum = vec3(0.299, 0.587, 0.114);
  vec3 gray = vec3(dot(lum, color));
  return mix(color, gray, factor);
}

vec3 hueShift(vec3 color, float shift) {
  vec3 gray = vec3(0.57735);
  vec3 proj = gray * dot(gray, color);
  vec3 U = color - proj;
  vec3 V = cross(gray, U);
  vec3 shifted = U * cos(shift) + V * sin(shift) + proj;
  return shifted;
}
#endif

void main(void) {
  vec2 dy = dFdy(v_uv);

  vec4 color = texture2D(u_paletteTexture, vec2(v_uv.x, v_uv.y));
  color.rgb = contrast(color.rgb, u_colorContrast);
  color.rgb = desaturate(color.rgb, 1.0 - u_colorSaturation);
  color.rgb = hueShift(color.rgb, u_colorHueShift);

  float lineThickness = max(0.005, u_lineThickness * pow(abs(dy.s * u_maxWidth), u_lineDerivativePower));
  float a = abs(sin(v_uv.x * u_lineAmount));
  a = smoothstep(lineThickness, 0.0, a);

  float depthFade = clamp(0.0, 1.0, v_clipPosition.z * 6.0);

  // Mask between lines using card/section background (u_clearColor)
  vec3 surfaceColor = mix(u_clearColor, color.rgb, a * (1.0 - depthFade));

  // Soft edge feathering so ribbon edges blend seamlessly into the container
  float edgeFadeX = smoothstep(0.0, 0.03, v_uv.x) * smoothstep(1.0, 0.97, v_uv.x);
  float edgeFadeY = smoothstep(0.0, 0.04, v_uv.y) * smoothstep(1.0, 0.96, v_uv.y);
  float edgeFade = edgeFadeX * edgeFadeY;

  gl_FragColor = vec4(surfaceColor, edgeFade);
}
`;

/**
 * Initializes a single wave canvas instance
 */
export function initWaveCanvas(canvasEl: HTMLCanvasElement): WaveInstance | null {
  const parent = canvasEl.parentElement;
  if (!parent) return null;

  const W = Math.max(parent.clientWidth, 320);
  const H = Math.max(parent.clientHeight, 200);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Determine clear color for line masking
  const explicitColor = canvasEl.dataset.clearColor;
  let clearColorVec = new THREE.Vector3(245 / 255, 242 / 255, 237 / 255); // Default cream

  if (explicitColor) {
    clearColorVec = parseColorToVec3(explicitColor, clearColorVec);
  } else {
    const parentContainer = canvasEl.closest(".footer-cta-card, #hero-section, section") as HTMLElement | null;
    if (parentContainer) {
      const bg = window.getComputedStyle(parentContainer).backgroundColor;
      clearColorVec = parseColorToVec3(bg, clearColorVec);
    }
  }

  // Reference screen size for consistent wave scaling
  const REF_WIDTH = parseFloat(canvasEl.dataset.refWidth || "1425");
  const REF_HEIGHT = parseFloat(canvasEl.dataset.refHeight || "783");
  const mobileBreakpoint = parseFloat(canvasEl.dataset.mobileBreakpoint || "1024");
  const mobileScaleMultiplier = parseFloat(canvasEl.dataset.mobileScale || "1.0");

  const computeScale = (w: number, h: number) => {
    const isMobile = w < mobileBreakpoint;
    const scaleMode = canvasEl.dataset.scaleMode;

    // On mobile screens (<1024px) or when fit-width is explicitly specified,
    // scale based on width so the full wave ribbon spans across the viewport
    // without being cropped into a narrow zoomed-in slice.
    if (scaleMode === "fit-width" || (isMobile && scaleMode !== "cover")) {
      return (w / REF_WIDTH) * mobileScaleMultiplier;
    }

    const MIN_SCALE = parseFloat(canvasEl.dataset.minScale || "0.65");
    const rawScale = Math.max(w / REF_WIDTH, h / REF_HEIGHT);
    return Math.max(rawScale, MIN_SCALE);
  };

  const initialScale = computeScale(W, H);

  // ─── Scene & Camera ────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 1, 10000);
  camera.zoom = initialScale;
  camera.updateProjectionMatrix();
  camera.position.set(100, 0, 5000);
  camera.lookAt(0, 0, 0);

  // ─── Renderer ──────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasEl,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(dpr);
  renderer.setSize(W, H, false);
  renderer.setClearColor(0x000000, 0);

  // ─── Textures (Shared across instances) ─────────────────────────────────────
  if (!sharedFallbackTexture) {
    sharedFallbackTexture = createFallbackPaletteTexture();
  }

  if (!sharedWebpTexture) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/palette-dark.webp",
      (tex) => {
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        sharedWebpTexture = tex;
        instances.forEach((inst) => {
          inst.material.uniforms.u_paletteTexture.value = tex;
        });
      },
      undefined,
      () => {
        // Fallback already active
      }
    );
  }

  const activeTex = sharedWebpTexture || sharedFallbackTexture;

  // ─── Geometry (Shared across instances) ─────────────────────────────────────
  if (!sharedGeometry) {
    sharedGeometry = createFoldedGeometry(400, 400, 128, 256);
  }

  // ─── Uniforms & Material ───────────────────────────────────────────────────
  const uniforms = {
    u_time: { value: 1150.0 },
    u_speed: { value: 0.00004 },
    u_resolution: { value: new THREE.Vector2(W * dpr, H * dpr) },
    u_paletteTexture: { value: activeTex },
    u_colorContrast: { value: 1.0 },
    u_colorSaturation: { value: 1.15 },
    u_colorHueShift: { value: -0.03159 },
    u_displaceFrequencyX: { value: 0.003234 },
    u_displaceFrequencyZ: { value: 0.00799 },
    u_displaceAmount: { value: 6.051 },
    u_twistFrequencyX: { value: -0.055 },
    u_twistFrequencyY: { value: 0.077 },
    u_twistFrequencyZ: { value: -0.518 },
    u_twistPowerX: { value: 3.95 },
    u_twistPowerY: { value: 5.85 },
    u_twistPowerZ: { value: 6.33 },
    u_glowAmount: { value: 0.6 },
    u_glowPower: { value: 0.589 },
    u_glowRamp: { value: 1.0 },
    u_mousePosition: { value: new THREE.Vector2(0, 0) },
    u_lineAmount: { value: 425.0 },
    u_lineThickness: { value: 1.0 },
    u_lineDerivativePower: { value: 0.95 },
    u_maxWidth: { value: REF_WIDTH * initialScale },
    u_clearColor: { value: clearColorVec },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    uniforms,
    transparent: true,
    side: THREE.DoubleSide,
    depthTest: true,
    depthWrite: true,
  });

  const mesh = new THREE.Mesh(sharedGeometry, material);

  // Position and rotation with responsive support for mobile dataset attributes
  const updateTransform = (width: number) => {
    const isMobile = width < mobileBreakpoint;

    let posX = -24.3;
    let posY = -56.4;
    let posZ = -11.1;

    const offX =
      isMobile && canvasEl.dataset.mobileOffsetX !== undefined
        ? parseFloat(canvasEl.dataset.mobileOffsetX)
        : canvasEl.dataset.offsetX
        ? parseFloat(canvasEl.dataset.offsetX)
        : 0;

    const offY =
      isMobile && canvasEl.dataset.mobileOffsetY !== undefined
        ? parseFloat(canvasEl.dataset.mobileOffsetY)
        : canvasEl.dataset.offsetY
        ? parseFloat(canvasEl.dataset.offsetY)
        : 0;

    mesh.position.set(posX + offX, posY + offY, posZ);

    let rotX = -0.15959;
    let rotY = -0.28359;
    let rotZ = -2.81559;

    const rotZAttr =
      (isMobile && canvasEl.dataset.mobileRotationZ) ||
      canvasEl.dataset.rotationZ ||
      canvasEl.dataset.rotation;
    if (rotZAttr) {
      rotZ += (parseFloat(rotZAttr) * Math.PI) / 180;
    }
    if (canvasEl.dataset.rotationX) {
      rotX += (parseFloat(canvasEl.dataset.rotationX) * Math.PI) / 180;
    }
    if (canvasEl.dataset.rotationY) {
      rotY += (parseFloat(canvasEl.dataset.rotationY) * Math.PI) / 180;
    }

    mesh.rotation.set(rotX, rotY, rotZ);
  };

  updateTransform(W);
  mesh.scale.set(10, 10, 7);
  scene.add(mesh);

  // ─── Mouse Tracking ────────────────────────────────────────────────────────
  const onMouseMove = (e: MouseEvent) => {
    const rect = canvasEl.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      uniforms.u_mousePosition.value.set(x, y);
    }
  };
  window.addEventListener("mousemove", onMouseMove, { passive: true });

  // ─── Resize Handling ───────────────────────────────────────────────────────
  let lastW = 0;
  let lastH = 0;
  const resize = () => {
    if (!parent) return;
    const curW = Math.min(Math.max(parent.clientWidth, 320), 3840);
    const curH = Math.min(Math.max(parent.clientHeight, 200), 2160);
    if (curW === 0 || curH === 0) return;
    if (Math.abs(curW - lastW) < 2 && Math.abs(curH - lastH) < 2) return;
    lastW = curW;
    lastH = curH;

    const curDpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(curDpr);
    renderer.setSize(curW, curH, false);

    const curScale = computeScale(curW, curH);

    updateTransform(curW);

    camera.left = -curW / 2;
    camera.right = curW / 2;
    camera.top = curH / 2;
    camera.bottom = -curH / 2;
    camera.zoom = curScale;
    camera.updateProjectionMatrix();

    uniforms.u_resolution.value.set(curW * curDpr, curH * curDpr);
    uniforms.u_maxWidth.value = REF_WIDTH * curScale;
  };

  const observer = new ResizeObserver(resize);
  observer.observe(parent);

  // ─── Animation Loop & State Controls ──────────────────────────────────────
  const isStatic = canvasEl.dataset.static === "true";
  let isPaused = isStatic || canvasEl.dataset.paused === "true";
  const initialTime = parseFloat(canvasEl.dataset.initialTime || canvasEl.dataset.time || "1150.0");
  const timeOffset = initialTime;

  let startTime: number | null = null;
  let introTimeRamp = 0;
  let rafId: number | null = null;

  const markLoaded = () => {
    canvasEl.classList.add("wave-loaded");
    if (parent) {
      parent.classList.add("wave-ready");
    }
    canvasEl.dispatchEvent(new CustomEvent("waverendered", { bubbles: true }));
  };

  const renderFrame = (customTime?: number) => {
    if (typeof customTime === "number") {
      uniforms.u_time.value = customTime;
    }
    renderer.render(scene, camera);
    markLoaded();
  };

  const animate = (timestamp: number) => {
    if (isPaused) return;

    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;

    introTimeRamp = Math.min(introTimeRamp + 0.016, 1.0);
    const activeElapsed = elapsed * introTimeRamp;

    uniforms.u_time.value = timeOffset + activeElapsed;

    renderer.render(scene, camera);
    markLoaded();

    rafId = requestAnimationFrame(animate);
    instance.raf = rafId;
  };

  const pause = () => {
    isPaused = true;
    instance.isPaused = true;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    instance.raf = null;
  };

  const play = () => {
    if (!isPaused) return;
    isPaused = false;
    instance.isPaused = false;
    startTime = null;
    rafId = requestAnimationFrame(animate);
    instance.raf = rafId;
  };

  const captureScreenshot = (filename = "wave-placeholder.png"): string => {
    // Render the initial or current frame cleanly
    renderer.render(scene, camera);
    const dataUrl = canvasEl.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return dataUrl;
  };

  // Render initial static frame immediately
  renderFrame(timeOffset);

  // If not static or paused, begin animation loop
  if (!isPaused) {
    rafId = requestAnimationFrame(animate);
  }

  const instance: WaveInstance = {
    canvas: canvasEl,
    renderer,
    scene,
    camera,
    mesh,
    material,
    observer,
    onMouseMove,
    raf: rafId,
    isPaused,
    timeOffset,
    pause,
    play,
    renderFrame,
    captureScreenshot,
  };

  instances.push(instance);
  return instance;
}

/**
 * Captures a pristine screenshot of a wave canvas at a specified time (defaults to initial 1150.0)
 * and automatically triggers a PNG download.
 */
export function captureWaveScreenshot(
  target: string | HTMLCanvasElement = "#hero-wave-canvas",
  filename = "wave-placeholder.png",
  atTime = 1150.0
): string | null {
  const canvas =
    typeof target === "string" ? document.querySelector<HTMLCanvasElement>(target) : target;
  if (!canvas) {
    console.warn(`[WaveAnimation] Canvas not found for selector: ${target}`);
    return null;
  }

  const inst = instances.find((i) => i.canvas === canvas);
  if (!inst) {
    console.warn("[WaveAnimation] Wave instance not found for canvas:", canvas);
    return null;
  }

  // Pause animation so it remains fixed
  inst.pause();

  // Set the specific time (initial state) and render
  inst.renderFrame(atTime);

  // Trigger download
  const dataUrl = inst.captureScreenshot(filename);
  console.log(`[WaveAnimation] Screenshot captured at time=${atTime} and downloaded as "${filename}"`);
  return dataUrl;
}

/**
 * Pauses/stops all running wave animations (freezes current frame)
 */
export function pauseWaveAnimation(): void {
  instances.forEach((inst) => inst.pause());
}

export const stopWaveAnimation = pauseWaveAnimation;

/**
 * Resumes all paused wave animations
 */
export function resumeWaveAnimation(): void {
  instances.forEach((inst) => inst.play());
}

export const playWaveAnimation = resumeWaveAnimation;

/**
 * Renders all wave instances at an exact time (e.g. 1150.0 for initial state)
 */
export function setWaveTime(time: number): void {
  instances.forEach((inst) => {
    inst.pause();
    inst.renderFrame(time);
  });
}

/**
 * Initializes all wave canvases found on the page (#footer-wave-canvas, #hero-wave-canvas, .stripe-wave-canvas)
 */
export function initFooterWaveAnimation(): void {
  destroyFooterWaveAnimation();

  // ─── Mobile guard: skip Three.js entirely on small screens ───────────────
  // The canvases are already CSS-hidden on mobile. Skipping WebGL init here
  // prevents GPU memory allocation and an active rAF render loop on mobile.
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
    return;
  }

  // Find all wave canvases
  const canvases = document.querySelectorAll<HTMLCanvasElement>(
    "#footer-wave-canvas, #hero-wave-canvas, .stripe-wave-canvas, .developers-wave-animation__canvas"
  );

  canvases.forEach((canvas) => {
    initWaveCanvas(canvas);
  });
}

// Alias for convenience
export const initWaveAnimations = initFooterWaveAnimation;

export function destroyFooterWaveAnimation(): void {
  while (instances.length > 0) {
    const inst = instances.pop()!;
    if (inst.raf) {
      cancelAnimationFrame(inst.raf);
    }
    if (inst.observer) {
      inst.observer.disconnect();
    }
    if (inst.onMouseMove) {
      window.removeEventListener("mousemove", inst.onMouseMove);
    }
    if (inst.mesh && inst.scene) {
      inst.scene.remove(inst.mesh);
    }
    if (inst.material) {
      inst.material.dispose();
    }
    if (inst.renderer) {
      inst.renderer.dispose();
    }
  }
}

// Register global helpers on window for direct access via DevTools console
if (typeof window !== "undefined") {
  (window as any).waveControls = {
    pause: pauseWaveAnimation,
    stop: stopWaveAnimation,
    play: playWaveAnimation,
    resume: resumeWaveAnimation,
    capture: captureWaveScreenshot,
    setTime: setWaveTime,
    instances,
  };
  (window as any).captureWaveScreenshot = captureWaveScreenshot;
}