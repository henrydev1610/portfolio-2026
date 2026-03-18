import Image from "next/image";
import { Sparkle } from "lucide-react";

import heroPhoto from "@/app/foto-home1.jpeg";
import { MagneticButton } from "@/components/magnetic-button";
import { PartnerMarquee } from "@/components/partner-marquee";

export function HeroSection() {
  return (
    <section className="hero-shell relative overflow-hidden rounded-[36px] px-1.5 pt-2.5 sm:px-2 sm:pt-2 lg:min-h-[860px] lg:rounded-[34px]">
      <div className="hero-image absolute inset-0 z-0 overflow-hidden rounded-[36px] lg:rounded-[34px]">
        <Image
          src={heroPhoto}
          alt="Henry Dev"
          fill
          priority
          quality={82}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1400px"
          className="object-cover object-[56%_24%] contrast-[1.06] brightness-[0.88] saturate-[0.9] sm:object-[60%_20%] md:object-[70%_center] lg:object-[64%_28%]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] rounded-[36px] bg-[linear-gradient(180deg,rgba(13,13,13,0.24)_0%,rgba(13,13,13,0.44)_34%,rgba(13,13,13,0.88)_100%)] lg:rounded-[34px]" />
      <div className="pointer-events-none absolute inset-0 z-[2] rounded-[36px] bg-[linear-gradient(180deg,rgba(13,13,13,0.92)_0%,rgba(13,13,13,0.5)_16%,rgba(13,13,13,0.2)_40%,rgba(13,13,13,0.22)_58%,rgba(13,13,13,0.78)_78%,rgba(13,13,13,0.94)_100%)] lg:rounded-[34px] lg:bg-[linear-gradient(90deg,rgba(13,13,13,0.96)_0%,rgba(13,13,13,0.68)_18%,rgba(13,13,13,0.12)_40%,rgba(13,13,13,0.14)_58%,rgba(13,13,13,0.82)_78%,rgba(13,13,13,0.96)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[3] rounded-[36px] bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.16),transparent_20%),linear-gradient(180deg,rgba(13,13,13,0.54)_0%,transparent_24%,transparent_63%,rgba(13,13,13,0.82)_100%)] lg:rounded-[34px]" />
      <div className="pointer-events-none absolute inset-x-[8%] top-[9%] z-[4] h-[42%] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.11),transparent_58%)] blur-3xl" />

      <div className="relative z-[5] flex flex-col px-4 pb-5 pt-5 sm:px-5 sm:pb-6 sm:pt-5 lg:block lg:px-0 lg:pb-0 lg:pt-0">
        <div className="order-1 mt-2 px-2 sm:mt-3 lg:mt-[-74px] lg:px-0">
          <h1 className="hero-name translate-y-10 text-center text-[clamp(3.65rem,17vw,12.6rem)] leading-[0.88] font-semibold tracking-[-0.09em] text-white">
            Henry
          </h1>
        </div>

        <div className="order-2 grid gap-6 pt-5 sm:gap-7 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:pt-0">
        <div className="hero-left translate-y-8 pt-2 text-center lg:max-w-[260px] lg:pt-20 lg:text-left">
          <div className="hero-text-panel inline-block w-full max-w-[23rem] rounded-[32px] p-4 sm:p-5">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-white/58">
              <Sparkle className="h-3 w-3 text-primary" strokeWidth={1.7} />
              Sistemas visuais autorais
            </div>
            <p className="balanced-text mx-auto max-w-[11ch] text-[clamp(2rem,9vw,2.7rem)] leading-[0.98] font-medium tracking-[-0.03em] text-white lg:mx-0">
              Engenheiro Full Stack &amp; UI criando experiências web premium
            </p>
          </div>
        </div>

        <div className="hero-figure relative order-first mx-auto h-[290px] w-full max-w-[320px] sm:h-[360px] sm:max-w-[390px] md:h-[400px] md:max-w-[420px] lg:order-none lg:h-[500px] lg:max-w-[500px]">
          <div className="absolute inset-x-[16%] top-[8%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_62%)] blur-3xl" />
          <div className="absolute inset-x-[20%] bottom-[12%] h-[24%] rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.2),transparent_70%)] blur-3xl" />
        </div>

        <div className="hero-right translate-y-8 pt-0 text-center lg:ml-auto lg:max-w-[280px] lg:pt-20 lg:text-right">
          <div className="hero-text-panel ml-auto w-full max-w-[24rem] rounded-[32px] p-4 sm:p-5 lg:max-w-[320px]">
            <p className="balanced-text mx-auto max-w-[31ch] text-[0.96rem] leading-[1.75] text-white/64 lg:mx-0">
              Sou Henry, um desenvolvedor focado em criar interfaces elegantes, sites imersivos e
              produtos digitais modernos que combinam design, performance e estratégia.
            </p>
            <div className="hero-cta flex translate-y-8 justify-center pt-6 lg:justify-end">
              <MagneticButton
                href="#projects"
                label="Ver meus projetos"
                className="w-full justify-center sm:w-auto"
              />
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="relative z-[5]">
        <PartnerMarquee />
      </div>
    </section>
  );
}
