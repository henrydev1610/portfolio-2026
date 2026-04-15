import { MagneticButton } from "@/components/magnetic-button";
import { StatementVideoShowcase } from "@/components/statement-video-showcase";

export function StatementSection() {
  return (
    <section className="px-1 pb-4 pt-12 sm:px-2 sm:pb-3 sm:pt-16 lg:px-3 lg:pb-6 lg:pt-24">
      <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-14">
        <StatementVideoShowcase />

        <div className="statement-copy-wrap order-1 mx-auto w-full max-w-[23rem] px-4 sm:max-w-none sm:px-2 lg:order-2 lg:px-0">
          <div className="statement-title mx-auto w-full max-w-[340px] space-y-1.5 md:text-center text-center text-[clamp(2rem,7vw,3rem)] leading-[0.95] font-medium tracking-[-0.04em] text-white sm:max-w-[340px] md:max-w-[420px] md:text-[clamp(2.2rem,6.6vw,3.35rem)] lg:mx-0 lg:max-w-none lg:space-y-1 lg:text-left lg:text-[clamp(2.35rem,8vw,5.4rem)] lg:leading-[0.94] lg:tracking-[-0.06em]">
            {["Criando interfaces", "premium e produtos", "digitais que se destacam"].map((line) => (
              <div key={line} className="line translate-y-8 opacity-0 lg:hidden">
                {line}
              </div>
            ))}

            {[
              "Criando interfaces",
              "premium e produtos",
              "digitais que se destacam",
            ].map((line) => (
              <div key={`${line}-desktop`} className="line hidden translate-y-8 opacity-0 lg:block">
                {line}
              </div>
            ))}
          </div>

          <p className="statement-copy mt-6 max-w-[32ch] translate-y-8 text-[0.95rem] leading-[1.8] text-white/56 sm:mt-6 sm:max-w-[520px] sm:text-[0.98rem] sm:leading-7 sm:text-white/50">
            Do conceito ao lançamento, crio experiências modernas com forte identidade
            visual, interações suaves e arquitetura front-end escalável para
            marcas ambiciosas e produtos digitais.
          </p>

          <div className="statement-cta mt-7 translate-y-8 sm:mt-6">
            <MagneticButton
              href="#projects"
              label="Ver projetos"
              className="w-full max-w-[13.5rem] justify-center px-5 py-3.5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
