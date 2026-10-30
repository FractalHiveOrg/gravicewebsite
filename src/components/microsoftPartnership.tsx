import Image from "next/image";

export const MicrosoftPartnerBanner = () => {
    return (
        <div className="relative isolate flex flex-col items-center justify-center gap-5 overflow-hidden text-left rounded-[18px] bg-(--gv-navy) px-[clamp(24px,4.5vw,56px)] py-[clamp(32px,4.5vw,56px)] sm:flex-row sm:gap-[clamp(20px,3.2vw,44px)]">
            {/* dot field and orange glow both fade to nothing before the edges, so the banner blends into its background */}
            {/* <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(74,111,165,.6)_1.7px,transparent_2.2px)] bg-size-[16px_16px] bg-center [mask-image:radial-gradient(closest-side,#000_25%,transparent)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(closest-side,rgba(242,107,47,.24),transparent_60%)]"
            /> */}

            {/* badge art is gray on transparent, so it sits on a white card to stay legible on navy */}
            <a href="https://marketplace.microsoft.com/en-us/product/fractalhive01.v-track" >
                <Image
                 
                    src="/brand/microsoft-solutions-partner-isv.png"
                    alt="Microsoft Solutions Partner, ISV Success Program"
                    width={142}
                    height={69}
                    className="h-[clamp(48px,5vw,69px)] w-auto"
                    unoptimized
                />
            </a>
            <span aria-hidden className="h-px w-16 flex-none bg-[rgba(74,111,165,.55)] sm:my-1 sm:h-auto sm:w-px sm:self-stretch" />
            <Image
                src="/brand/logo-horizontal-on-dark.png"
                alt="Gravice"
                width={352}
                height={96}
                className="h-[clamp(35px,4.4vw,58px)] w-auto"
                unoptimized
            />
        </div>
    )
}

export const MicrosoftPartnership = ()=>{
    return (
        <div className="px-10 pt-5" data-gv-reveal>
            <MicrosoftPartnerBanner />
        </div>
    )

}
