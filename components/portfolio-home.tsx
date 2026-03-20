import { FloatingActionButtons } from "@/components/floating-action-buttons";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { NoiseOverlay } from "@/components/noise-overlay";
import { PageIntro } from "@/components/page-intro";
import { PortfolioHomeEffects } from "@/components/portfolio-home-effects";
import { ProjectCards } from "@/components/project-cards";
import { ServicesSection } from "@/components/services-section";
import { SiteNavbar } from "@/components/site-navbar";
import { StatementSection } from "@/components/statement-section";
import { StickyFloatingMenu } from "@/components/sticky-floating-menu";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TechStackCarousel } from "@/components/tech-stack-carousel";

export function PortfolioHome() {
  return (
    <main id="top" className="page-shell">
      <PortfolioHomeEffects />
      <PageIntro />
      <NoiseOverlay />
      <FloatingActionButtons />
      <StickyFloatingMenu targetSelector="#site-navbar" />

      <div className="app-shell-mobile mx-auto min-h-screen max-w-[1600px] px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
        <div className="relative rounded-[38px] border border-white/8 bg-[#111111] px-3.5 pb-8 pt-3.5 shadow-[0_32px_100px_rgba(0,0,0,0.28)] sm:px-6 sm:pb-10 sm:pt-6 lg:rounded-[34px] lg:border-white/6 lg:px-10 lg:pb-14">
          <SiteNavbar />
          <HeroSection />
          <StatementSection />
          <TechStackCarousel />
          <ServicesSection />
          <TestimonialsSection />
          <ProjectCards />
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
