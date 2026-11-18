import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low pt-16 pb-12 mt-space-xl">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-16">
          {/* Brand Intro & Mission */}
          <div className="lg:col-span-4 space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <img
                alt="Chic N Co. Brand Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XxsK-IQFDu8j8W5jnMqIUjMpnb6mgGBvYX-eomQMvfpkVb5mkgCpTodUIfzORDdt2OMSSUmphL2XZymRFuq1F3p2jGeQbNkOdiw_WbbJP_SrX24UZYtq2DPfO-gieFKMWZ61awkKhRWI4uCTRpS6a8bLtgMzi7PV5YEKavrbTuBgYtXkVFKE6V0beWPmd0dwqYdzntui-cS2PwLkEO4qJDkRx74FwU_feMXqWgrGqIVNsIaSwyAMdPvpao"
              />
              <span className="font-title-editorial text-title-editorial uppercase text-on-surface font-bold tracking-tight">
                Chic N Co.
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Style That Fits You. Thoughtfully designed fashion celebrating confident femininity and inclusive silhouettes.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-space-md pt-space-xs">
              <a
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">push_pin</span>
              </a>
              <a
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
              </a>
              <a
                aria-label="Vogue Runway"
                className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                href="https://vogue.com"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">auto_stories</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-space-md">
            <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-bold">
              Collections
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><Link className="hover:text-on-surface transition-colors" to="/shop">Shop All</Link></li>
              <li><Link className="hover:text-on-surface transition-colors" to="/shop?category=Dresses">Dresses</Link></li>
              <li><Link className="hover:text-on-surface transition-colors" to="/shop?category=Co-ords">Co-ords</Link></li>
              <li><Link className="hover:text-on-surface transition-colors" to="/shop?category=Tops & Blouses">Tops & Blouses</Link></li>
              <li><Link className="hover:text-on-surface transition-colors" to="/shop?category=Plus Size Atelier">Plus Size Atelier</Link></li>
              <li><Link className="hover:text-on-surface transition-colors" to="/shop?sort=newest">New Drops</Link></li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="lg:col-span-2 space-y-space-md">
            <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-bold">
              Atelier Care
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li><Link className="hover:text-on-surface transition-colors" to="/contact">Live Sizing Concierge</Link></li>
              <li><Link className="hover:text-on-surface transition-colors" to="/contact">Shipping & Returns</Link></li>
              <li><Link className="hover:text-on-surface transition-colors" to="/about">Our Philosophy</Link></li>
              <li><Link className="hover:text-on-surface transition-colors" to="/contact">Private Showroom</Link></li>
              <li><Link className="hover:text-on-surface transition-colors" to="/cart">Track Delivery</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-4 space-y-space-md">
            <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-bold">
              The Atelier Journal
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Receive private invitations to seasonal drops, fabric archives, and exclusive 15% first-order benefits.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to private atelier previews!'); }} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface placeholder:text-outline text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-secondary transition-colors shadow-sm"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-[12px] text-on-surface-variant">
          <p>© {new Date().getFullYear()} Chic N Co. All Rights Reserved. Modern Editorial Atelier.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
            <span>Sustainability Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

