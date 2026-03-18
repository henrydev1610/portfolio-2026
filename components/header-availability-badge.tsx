"use client";

export function HeaderAvailabilityBadge() {
  return (
    <div className="glass-panel inline-flex min-h-12 items-center gap-3 rounded-full px-4 py-2.5 sm:px-3 sm:py-2">
      <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(255,107,53,0.9)]" />
      <span className="text-[0.72rem] font-medium tracking-[0.16em] text-white/88 uppercase">
        Henry.
      </span>
      <span className="hidden text-[0.62rem] tracking-[0.16em] text-white/45 uppercase md:block">
        Disponível para projetos
      </span>
    </div>
  );
}
