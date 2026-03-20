import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Linkedin, MessageCircle } from "lucide-react";

import { AppLink } from "@/components/app-link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/about" },
  { label: "Projetos", href: "/#projects" },
  { label: "Testemunhos", href: "/#testimonials" },
  { label: "Contato", href: "/#contact" },
] as const;

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/seu-perfil", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/seu-perfil/", Icon: Instagram },
  { label: "WhatsApp", href: "https://wa.me/5500000000000", Icon: MessageCircle },
  { label: "GitHub", href: "https://github.com/seu-usuario", Icon: Github },
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-10 border-t border-white/8 bg-[linear-gradient(180deg,rgba(11,11,12,0.94),rgba(8,8,9,0.98))]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_22%),radial-gradient(circle_at_30%_10%,rgba(255,107,53,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.01),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-[18%] top-0 h-24 bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_72%)] blur-[72px]" />

      <div className="relative mx-auto max-w-[1600px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(220px,0.7fr)_minmax(260px,0.8fr)] lg:gap-12">
            <div className="max-w-[34rem]">
              <p className="text-[clamp(1.9rem,3vw,3.1rem)] leading-[0.95] font-medium tracking-[-0.06em] text-white">
                Henry Dev
              </p>
              <p className="mt-4 max-w-[28ch] text-[1rem] leading-7 text-white/54 sm:text-[1.04rem]">
                Produtos digitais premium, motion systems e interfaces com direcao visual, performance e acabamento high-end.
              </p>
            </div>

            <div>
              <p className="mb-4 text-[0.7rem] uppercase tracking-[0.22em] text-white/38">
                Navegacao
              </p>
              <nav className="grid gap-3">
                {quickLinks.map((link) => (
                  <AppLink
                    key={link.label}
                    href={link.href}
                    className="group inline-flex w-fit items-center gap-2 text-sm text-white/56 transition-colors duration-300 hover:text-white"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      {link.label}
                    </span>
                    <span className="h-px w-0 bg-primary/70 transition-all duration-300 group-hover:w-5" />
                  </AppLink>
                ))}
              </nav>
            </div>

            <div>
              <p className="mb-4 text-[0.7rem] uppercase tracking-[0.22em] text-white/38">
                Social
              </p>
              <div className="grid gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-white/58 transition-[transform,border-color,background,color] duration-300 hover:-translate-y-0.5 hover:border-primary/22 hover:bg-white/[0.04] hover:text-white"
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] transition-colors duration-300 group-hover:border-primary/24">
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                      </span>
                      {label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-6 text-sm text-white/36 sm:flex-row sm:items-center sm:justify-between">
            <p>{currentYear} Henry Dev. Todos os direitos reservados.</p>
            <p className="max-w-[32ch] text-white/32 sm:text-right">
              Crafted with intention, design and performance.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
