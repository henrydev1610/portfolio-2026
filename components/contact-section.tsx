"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type ContactItem = {
  name: string;
  description: string;
  cta: string;
  href: string;
  Icon: typeof MessageCircle;
};

const contactItems: ContactItem[] = [
  {
    name: "WhatsApp",
    description: "Conversa direta para projetos, propostas e alinhamentos rapidos.",
    cta: "Abrir conversa",
    href: "https://wa.me/5500000000000",
    Icon: MessageCircle,
  },
  {
    name: "LinkedIn",
    description: "Conexao profissional para networking, oportunidades e presenca estrategica.",
    cta: "Ver perfil",
    href: "https://www.linkedin.com/in/seu-perfil",
    Icon: Linkedin,
  },
  {
    name: "Instagram",
    description: "Canal visual para acompanhar minha linguagem criativa, referencias e bastidores.",
    cta: "Acompanhar feed",
    href: "https://www.instagram.com/seu-perfil/",
    Icon: Instagram,
  },
];

const contactFields = [
  {
    label: "Nome",
    name: "name",
    type: "text",
    placeholder: "Seu nome",
  },
  {
    label: "E-mail",
    name: "email",
    type: "email",
    placeholder: "voce@projeto.com",
  },
  {
    label: "Assunto",
    name: "subject",
    type: "text",
    placeholder: "Briefing, parceria ou proposta",
  },
] as const;

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const context = gsap.context(() => {
      const headerItems = gsap.utils.toArray<HTMLElement>(".contact-header > *");
      const cards = gsap.utils.toArray<HTMLElement>(".contact-card");
      const panels = gsap.utils.toArray<HTMLElement>(".contact-panel");

      gsap.set(headerItems, {
        opacity: 0,
        y: 28,
        filter: "blur(12px)",
      });

      gsap.set(cards, {
        opacity: 0,
        y: 42,
      });
      gsap.set(panels, {
        opacity: 0,
        y: 38,
        filter: "blur(10px)",
      });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        })
        .to(headerItems, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.88,
          stagger: 0.12,
        })
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.34",
        )
        .to(
          panels,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.94,
            stagger: 0.14,
          },
          "-=0.4",
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative px-1 pb-5 pt-12 sm:px-2 lg:px-3 lg:pb-8 lg:pt-16"
      aria-labelledby="contact-title"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/7 bg-[linear-gradient(180deg,rgba(10,10,11,0.96),rgba(14,14,15,0.98))] px-5 py-12 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:px-8 sm:py-14 lg:px-10 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_26%),radial-gradient(circle_at_50%_20%,rgba(255,107,53,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.01),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />
        <div className="pointer-events-none absolute left-[-8%] top-[18%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.15),transparent_72%)] blur-[88px]" />
        <div className="pointer-events-none absolute right-[-6%] bottom-[10%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_72%)] blur-[100px]" />
        <div className="pointer-events-none absolute inset-x-[16%] top-[12%] h-36 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_74%)] blur-[76px]" />

        <div className="contact-header relative z-[1] mx-auto max-w-[860px] text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/54">
            CONTATO
          </span>
          <h2
            id="contact-title"
            className="mx-auto max-w-[12ch] text-[clamp(2.35rem,5vw,5rem)] leading-[0.93] font-medium tracking-[-0.06em] text-white"
          >
            Vamos construir algo memoravel juntos.
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-[0.98rem] leading-7 text-white/52 sm:text-[1.02rem]">
            Estou disponivel para projetos, colaboracoes e experiencias digitais com direcao visual, performance e acabamento premium.
          </p>
        </div>

        <div className="relative z-[1] mt-10 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {contactItems.map(({ name, description, cta, href, Icon }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="contact-card group relative overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-[transform,border-color,box-shadow,background] duration-500 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-primary/28 hover:shadow-[0_30px_80px_rgba(255,107,53,0.14)] sm:p-7 lg:min-h-[320px] lg:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_38%,rgba(0,0,0,0.14)_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [box-shadow:inset_0_0_0_1px_rgba(255,107,53,0.18)]" />
              <div className="pointer-events-none absolute right-[-10%] top-[-8%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.16),transparent_72%)] blur-3xl" />

              <div className="relative z-[1] flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-[transform,border-color,box-shadow,color] duration-500 group-hover:scale-[1.05] group-hover:border-primary/25 group-hover:shadow-[0_16px_36px_rgba(255,107,53,0.14)]">
                    <Icon
                      className="h-6 w-6 text-white/86 transition-colors duration-500 group-hover:text-primary"
                      strokeWidth={1.8}
                    />
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 text-white/36 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/84"
                    strokeWidth={1.7}
                  />
                </div>

                <div className="mt-8">
                  <h3 className="text-[1.55rem] leading-[1.02] font-medium tracking-[-0.05em] text-white">
                    {name}
                  </h3>
                  <p className="mt-4 max-w-[30ch] text-[0.97rem] leading-7 text-white/54">
                    {description}
                  </p>
                </div>

                <div className="mt-8 pt-6">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/64 transition-colors duration-500 group-hover:border-primary/20 group-hover:text-white/82">
                    {cta}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="relative z-[1] mt-10 grid gap-5 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-6">
          <div className="contact-panel relative overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-7 lg:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_36%,rgba(0,0,0,0.18)_100%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
            <div className="pointer-events-none absolute right-[-8%] top-[-10%] h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.14),transparent_72%)] blur-3xl" />

            <div className="relative z-[1]">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
                  <Mail className="h-6 w-6 text-white/86" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[1.45rem] leading-[1.02] font-medium tracking-[-0.05em] text-white">
                    Envie sua mensagem
                  </p>
                  <p className="mt-1 text-sm text-white/50">
                    Estrutura pronta para integrar com API route ou serviço de e-mail.
                  </p>
                </div>
              </div>

              <form className="grid gap-4" action="#" method="post">
                <div className="grid gap-4 md:grid-cols-2">
                  {contactFields.slice(0, 2).map((field) => (
                    <label key={field.name} className="block">
                      <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-white/44">
                        {field.label}
                      </span>
                      <input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full rounded-[22px] border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition-[border-color,box-shadow,background] duration-300 placeholder:text-white/28 focus:border-primary/28 focus:bg-white/[0.05] focus:shadow-[0_0_0_1px_rgba(255,107,53,0.22),0_0_28px_rgba(255,107,53,0.08)]"
                      />
                    </label>
                  ))}
                </div>

                <label className="block">
                  <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-white/44">
                    {contactFields[2].label}
                  </span>
                  <input
                    name={contactFields[2].name}
                    type={contactFields[2].type}
                    placeholder={contactFields[2].placeholder}
                    className="w-full rounded-[22px] border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white outline-none transition-[border-color,box-shadow,background] duration-300 placeholder:text-white/28 focus:border-primary/28 focus:bg-white/[0.05] focus:shadow-[0_0_0_1px_rgba(255,107,53,0.22),0_0_28px_rgba(255,107,53,0.08)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-white/44">
                    Mensagem
                  </span>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Descreva o projeto, objetivo ou contexto da oportunidade."
                    className="w-full resize-none rounded-[24px] border border-white/10 bg-white/[0.035] px-4 py-4 text-sm leading-7 text-white outline-none transition-[border-color,box-shadow,background] duration-300 placeholder:text-white/28 focus:border-primary/28 focus:bg-white/[0.05] focus:shadow-[0_0_0_1px_rgba(255,107,53,0.22),0_0_28px_rgba(255,107,53,0.08)]"
                  />
                </label>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[32ch] text-sm leading-6 text-white/42">
                    Integração de envio pode ser conectada depois com endpoint do Next.js ou serviço externo.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white transition-[transform,border-color,box-shadow,background] duration-300 hover:-translate-y-0.5 hover:border-primary/24 hover:bg-white/[0.07] hover:shadow-[0_18px_34px_rgba(255,107,53,0.12)]"
                  >
                    Enviar mensagem
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="contact-panel grid gap-5">
            <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_36%,rgba(0,0,0,0.18)_100%)]" />
              <div className="pointer-events-none absolute left-[-8%] top-[-12%] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,107,53,0.13),transparent_72%)] blur-3xl" />

              <div className="relative z-[1] flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
                  <MapPin className="h-6 w-6 text-white/86" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[1.35rem] leading-[1.02] font-medium tracking-[-0.05em] text-white">
                    São Paulo, Brasil
                  </p>
                  <p className="mt-1 text-sm text-white/50">
                    Presença local para projetos premium, colaborações e reuniões estratégicas.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
              <div className="overflow-hidden rounded-[24px] border border-white/8">
                <iframe
                  title="Mapa de localização em São Paulo"
                  src="https://www.google.com/maps?q=S%C3%A3o%20Paulo%2C%20Brasil&z=11&output=embed"
                  className="h-[320px] w-full grayscale-[0.18] contrast-[1.08] brightness-[0.86] saturate-[0.8] sm:h-[360px] lg:h-[420px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
