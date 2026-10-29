"use client";

import { useState, type FormEvent } from "react";

const TOPICS = ["Product demo", "ElevateRM", "V-Track", "NICO", "Partnership", "Press", "Something else"];

/** Contact form. No backend yet: submitting opens the visitor's mail app with the message filled in. */
export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `${get("topic")}: ${get("name")}${get("company") ? `, ${get("company")}` : ""}`;
    const body = [
      get("message"),
      "",
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("company") && `Company: ${get("company")}`,
    ]
      .filter((line) => line !== "")
      .join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="gv-c-form" onSubmit={submit}>
      <div className="gv-c-field-row">
        <label className="gv-c-field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className="gv-c-field">
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <div className="gv-c-field-row">
        <label className="gv-c-field">
          <span>
            Company Name<i>(optional)</i>
          </span>
          <input name="company" type="text" autoComplete="organization" />
        </label>
        <label className="gv-c-field">
          <span>Subject</span>
          <select name="topic" defaultValue={TOPICS[0]}>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="gv-c-field">
        <span>Message</span>
        <textarea name="message" rows={5} required />
      </label>
      <div className="gv-c-form-foot">
        <button type="submit" data-magnetic className="gv-c-submit">
          Send message
        </button>
      </div>
    </form>
  );
}
