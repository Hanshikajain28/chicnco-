import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="w-full pt-28 bg-surface">
      {/* Editorial Hero Section */}
      <section className="relative w-full overflow-hidden pb-space-xl">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          {/* Breadcrumb */}
          <div className="flex items-center gap-space-sm mb-space-md">
            <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-bold">Our Story & Atelier</span>
            <span className="text-outline-variant font-body-sm">/</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">The Philosophy</span>
          </div>

          {/* Hero Asymmetric Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-end">
            <div className="lg:col-span-7 space-y-space-md">
              <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight">
                Crafted for <span className="italic font-normal text-secondary">Confidence.</span><br />
                Tailored for Every <span className="underline decoration-secondary-container decoration-4 underline-offset-8">Silhouette.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl pt-space-xs leading-relaxed">
                Chic N Co. began with a singular, uncompromising revelation: true luxury is how an exquisite garment makes you feel within your own skin. No pinching, no second-guessing—just timeless feminine resonance.
              </p>
              <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                <Link to="/shop" className="px-8 py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider shadow-md hover:bg-secondary transition-all">
                  Explore The Collection
                </Link>
                <a href="#founders-note" className="px-7 py-3.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg uppercase tracking-wider transition-colors flex items-center gap-space-xs">
                  <span>Founder's Diary</span>
                  <span className="material-symbols-outlined text-[18px]">south</span>
                </a>
              </div>
            </div>

            {/* Overlapping Editorial Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xl bg-surface-container">
                <img
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                  alt="Editorial Atelier"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdZU5u37Fz4_LkcaD1ZqDk7Oq3tWhOAAehDdMvcG1dMtAZJkA6vURh1llyjrcMF4xO59F5NqGVS0OJI1JtHuI4Mqtzfc825DtWFIE1pmK1DAKAaB-isI8uNnRgRSRbgKzLGMQ5408lqVknmXe3PmZwyuPomPzSczAL1C5w0RuDAIt2nV0Mv5ejVUgoUMBu1WmnynuDZHp1zgSzd7WDlogOhgojmyUix1ShMz_phCVdGQ8TJ3ANaoH9zg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-space-md rounded-lg bg-surface/90 backdrop-blur-md shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[24px] mb-1">format_quote</span>
                  <p className="font-title-editorial text-title-editorial text-on-surface italic leading-snug">
                    "We believe fashion should feel as extraordinary as it looks — without compromise on fit, fabric, or inclusivity."
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-bold">Atelier Creed</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold">Est. 2021 • NYC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Ribbon Divider */}
      <div className="w-full bg-surface-container py-space-md my-space-md overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md text-on-surface-variant font-bold">
          <span className="font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Zero Waste Pattern Drafting
          </span>
          <span className="hidden md:inline font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Fit Models Sizes 0 to 26
          </span>
          <span className="hidden sm:inline font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Ethical Family-Owned Ateliers
          </span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Natural Silk & Organic Fibers
          </span>
        </div>
      </div>

      {/* The 4 Pillars of Chic N Co. */}
      <section className="w-full py-space-xl">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Guiding Foundations</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">The Four Pillars of Chic N Co.</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Every silhouette is drafted through rigorous architectural scrutiny, ensuring effortless drape, durability, and tactile pleasure across every curve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Pillar 1 */}
            <div className="group bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="space-y-space-md">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[24px]">straighten</span>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Pillar 1"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc3CEfyMeYBWxVQ73OhCCvm4AYzSIJ2mqpuTe6S4onVpOac3KY1t1WioM605jmccdOhW6JQ-JI53V3M5d8FIMpOYrbwQLvSYSNjP6w-2OIzoqUhYUi_e00f-sOToKgZ-2CyDxPqqspV8uY8xJtmeyb3ItO3qAhWbbSdfvL_jlEhU5isoq0cX1PvVOtgIVFb1g7hOlyvubXMNtC95P3eZeh4mx8s0I5wKUjz5Lo27J53ltzqYrAU1iTZA"
                  />
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">Pillar I</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">Inclusive Sizing</h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Sizes 0 to 26 crafted independently on diverse live fit models—never mathematically scaled up from a single size 4 mannequin.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="space-y-space-md">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[24px]">eco</span>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Pillar 2"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5ep2ogXlPdsnSefQNZTUq0HDnm6scSaIE2TgwR5y-tEL0CF6GnRdYCF6QyXEkq0hr-eZ1XvSLcNpKkZZ4dImWi-U-CwPO_Be8UhhAROT3Q9YaUTxcYJ9rR6mV1Uh38CfzY13iMT2hay_S4HedMby1T8TUXcUt3JBMEmfNurERQXTdZ0iJ0fwePoA6wMim7FtPZza61WZ2kfcFpkS7GVBRp6Pi7Jjfhrreznb6EJaPx1-nWPabpZv7Bg"
                  />
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">Pillar II</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">Mindful Craft</h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Sustainable mulberry silk blends, certified organic cottons, and fair-wage partnerships with third-generation family ateliers in Porto.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="space-y-space-md">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[24px]">all_inclusive</span>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Pillar 3"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0b8SDHjMtmd2Ni55GsYK7I2seuVrCGBWAFTHzU2cPqvqqyP_n4L_XiMCQ5QkAuZyZfZ9EGXoCUPgXB82mu8q5_iPNxDz_4dTy_3XBjmIlo3NyD5heEHAN4uzJjcds1UsCTTLlAjlZQuZvR4N6w51Alp9ZTZD0RSUjCFRhvjPlBtIYH2JFrA9Dx1E5PJ4WWJ0QDQaapnEBngrqoaDS-v6Rpv31p7frTnT338SLDJFQ4FqvRZxW3aRS7w"
                  />
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">Pillar III</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">Versatile Design</h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Architecturally engineered ensembles crafted to transition seamlessly from morning executive briefings to terrace cocktails.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="group bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="space-y-space-md">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[24px]">spa</span>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Pillar 4"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx8VEdlVw-LjbrIFlRcjHVBDAMaqROrNAUA5oiSNA_PTs1UAasyG4R-unzM3mxe08JUTqgQAEPIxMXECaSf8XZwxeEcteYcCuAg8MJFa1IF4jb--iVLpzkTFHz2AjqXOWHtKiOYyuWkgAchidFAyMYdU2zsya4ZIO2faq31ok25D7exaVPKB_KrEXH-7H7vrsvWfErxZKl2VnQTebvpI8iD-IvJJZcrkpE4lCyDtbRabLZaXqmUfmE1w"
                  />
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">Pillar IV</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">Unmatched Comfort</h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Whisper-soft cupro linings, thoughtful mechanical stretch weaves, and breathable natural textiles that gently celebrate your body.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="w-full py-space-xl" id="founders-note">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-5 relative">
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    alt="Elena Moreau-Vance"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOpIttT3PGbc3BJuqRnSkosulxYCVoszmMRCCSlL0nltSRG6wTRN3dY_UhAi4fHNtRdxvV06SiOqGn9S0DLMV3WY4e6oZD8gM5pfy6P0zNsPY3QmiiBgk1CoB53G9TPzJhxbJf1do3xYnj87Ze9V06hJXGZf9KVmnNt4ip3J5_1uHwaWTDoDHhdMGB3h0VPngVJn7ducoTVBLJd13Bvk21UUeneYZZu9XSMTMk2ffivcyjC2GCO77-1w"
                  />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-space-md lg:pl-space-md">
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Behind The Atelier</span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">"Fashion should feel like coming home to oneself."</h2>
                </div>
                <div className="space-y-space-sm font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  <p>
                    Growing up immersed in my grandmother’s bespoke dressmaking atelier, I learned early on that beauty was never a single measurement tape reading. It was a posture. A deep breath. A sudden rush of effortless confidence when a seam cradles rather than constricts.
                  </p>
                  <p>
                    Chic N Co. was established as our heartfelt antidote. Here, we build garments designed around your life: clothes that celebrate boardroom triumphs, lazy Sunday brunches, and spontaneous midnight dinners. Every stitch is crafted to honor your presence in the room.
                  </p>
                </div>
                <div className="pt-space-md flex items-center justify-between border-t border-outline-variant/30 flex-wrap gap-space-md">
                  <div>
                    <p className="font-display-hero italic text-headline-md text-on-surface font-normal">Elena Moreau</p>
                    <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mt-0.5 font-bold">Founder & Chief Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

