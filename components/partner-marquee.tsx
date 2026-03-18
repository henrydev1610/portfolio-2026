const partners = ["Front-end", "Dev Criativo", "GSAP", "Next.js", "Sistemas UI", "Projetos Premium"];

export function PartnerMarquee() {
  return (
    <div className="mx-auto mt-6 flex max-w-[1180px] flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-white/6 px-2 pt-5 text-[0.79rem] tracking-[0.08em] text-white/28 sm:mt-7 sm:gap-x-7 sm:px-0 sm:text-[0.83rem] lg:justify-start lg:pl-4">
      {partners.map((partner) => (
        <span
          key={partner}
          className="partner-item translate-y-6 font-medium transition-colors duration-300 hover:text-white/42"
        >
          {partner}
        </span>
      ))}
    </div>
  );
}
