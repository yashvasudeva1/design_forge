import React from 'react';
import { CONTACT_INFO } from '../data/forgeData';

export type PageRoute = '/' | '/about' | '/services' | '/portfolio' | '/contact' | '/terms' | '/privacy';

interface TroveFooterProps {
  isDark: boolean;
  onToggleDark: () => void;
  onNavigate: (page: PageRoute) => void;
  onStartProject: () => void;
}

export const TroveFooter: React.FC<TroveFooterProps> = ({
  isDark,
  onToggleDark,
  onNavigate,
}) => {
  const handleNavClick = (e: React.MouseEvent, page: PageRoute) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      data-curtain="true"
      className="relative border-t border-[var(--border)] [clip-path:inset(0)]"
    >
      {/* Upper Colophon Grid - Exact Trove.quest 12-Column Proportions */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 grid grid-cols-4 gap-x-4 sm:grid-cols-6 sm:gap-x-6 lg:grid-cols-12 gap-y-8 pt-16 pb-10">
        <p className="col-span-full text-[11px] leading-[1.6] text-[var(--muted-foreground)]/80 lg:col-span-6">
          The work on this page belongs to the people and brands we forged it with: Elysium, Chocworks, Cirola, Aggarwal Living, Namespace BPIT, Darima Cheese, Opticlick, Oh Wow Gifts, World College of Medical Science, and S.D. Public School. Each card links to its project specimen. To start a commission from Delhi, write to{' '}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-[#901a1d] underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
          >
            {CONTACT_INFO.email}
          </a>{' '}
          or call {CONTACT_INFO.phones[0]}.
        </p>

        <footer className="col-span-full grid grid-cols-1 gap-y-2 text-[11px] text-[var(--muted-foreground)] sm:grid-cols-[1fr_auto] sm:items-center lg:col-span-5 lg:col-start-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:col-start-1 sm:row-start-1">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="transition-colors hover:text-[#901a1d]"
            >
              Home
            </a>
            <a
              href="/about"
              onClick={(e) => handleNavClick(e, '/about')}
              className="transition-colors hover:text-[#901a1d]"
            >
              About
            </a>
            <a
              href="/services"
              onClick={(e) => handleNavClick(e, '/services')}
              className="transition-colors hover:text-[#901a1d]"
            >
              Services
            </a>
            <a
              href="/portfolio"
              onClick={(e) => handleNavClick(e, '/portfolio')}
              className="transition-colors hover:text-[#901a1d]"
            >
              Portfolio
            </a>
            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, '/contact')}
              className="transition-colors hover:text-[#901a1d]"
            >
              Contact
            </a>
            <a
              href="/terms"
              onClick={(e) => handleNavClick(e, '/terms')}
              className="transition-colors hover:text-[#901a1d]"
            >
              Terms
            </a>
            <a
              href="/privacy"
              onClick={(e) => handleNavClick(e, '/privacy')}
              className="transition-colors hover:text-[#901a1d]"
            >
              Privacy
            </a>
          </div>

          <p className="text-[var(--muted-foreground)]/70 sm:col-start-1 sm:row-start-2">
            © 2026 Design Forge. All rights reserved.
          </p>

          <div className="flex items-center gap-x-3 pt-1 sm:col-start-2 sm:row-start-1 sm:justify-self-end sm:pt-0">
            <button
              type="button"
              onClick={onToggleDark}
              aria-label="Switch theme"
              title="Switch theme"
              className="inline-flex size-6 items-center justify-center rounded-sm text-[var(--muted-foreground)] transition-colors hover:text-[#901a1d] cursor-pointer"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="size-3.5"
                fill="none"
              >
                <g
                  className={`origin-center transition-all duration-300 ease-out ${
                    isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'
                  }`}
                >
                  <circle cx="8" cy="8" r="3" fill="currentColor" />
                  <path
                    d="M8 1.75v1.5M8 12.75v1.5M1.75 8h1.5M12.75 8h1.5M3.58 3.58l1.06 1.06M11.36 11.36l1.06 1.06M12.42 3.58l-1.06 1.06M4.64 11.36l-1.06 1.06"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </g>
                <path
                  d="M13.2 9.75A5.25 5.25 0 0 1 6.25 2.8a5.25 5.25 0 1 0 6.95 6.95Z"
                  fill="currentColor"
                  className={`origin-center transition-all duration-300 ease-out ${
                    isDark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
                  }`}
                />
              </svg>
            </button>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              aria-label="Design Forge Studio Email"
              className="inline-flex items-center text-[var(--muted-foreground)] transition-colors hover:text-[#901a1d]"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-3.5 fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </footer>
      </div>

      {/* Blind-Debossed Full-Bleed "DESIGN FORGE" Wordmark with #E2E2E2 Inside Colour & Wider Letters */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-2">
        <svg
          viewBox="0 0 1200 142"
          aria-label="Design Forge"
          role="img"
          className="pressed-mark block w-full select-none"
        >
          <defs>
            <filter
              id="trove-deboss"
              x="-10%"
              y="-25%"
              width="120%"
              height="150%"
              colorInterpolationFilters="sRGB"
            >
              <feOffset in="SourceAlpha" dx="0" dy="2.5" result="offDown" />
              <feGaussianBlur in="offDown" stdDeviation="2.5" result="blurDown" />
              <feComposite
                in="SourceAlpha"
                in2="blurDown"
                operator="out"
                result="topShadowMask"
              />
              <feFlood
                floodColor="#000000"
                floodOpacity={isDark ? '0.9' : '0.28'}
                result="shadowInk"
              />
              <feComposite
                in="shadowInk"
                in2="topShadowMask"
                operator="in"
                result="innerShadow"
              />
              <feOffset in="SourceAlpha" dx="0" dy="1.5" result="lipShift" />
              <feComposite
                in="lipShift"
                in2="SourceAlpha"
                operator="out"
                result="lipMask"
              />
              <feGaussianBlur in="lipMask" stdDeviation="0.6" result="lipSoft" />
              <feFlood
                floodColor="#ffffff"
                floodOpacity={isDark ? '0.18' : '0.95'}
                result="lipInk"
              />
              <feComposite
                in="lipInk"
                in2="lipSoft"
                operator="in"
                result="bottomLip"
              />
              <feMerge>
                <feMergeNode in="bottomLip" />
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="innerShadow" />
              </feMerge>
            </filter>
          </defs>
          <g
            filter="url(#trove-deboss)"
            fill={isDark ? '#1c1c1c' : '#E2E2E2'}
            stroke={isDark ? '#1c1c1c' : '#E2E2E2'}
            strokeWidth="2.4"
            strokeLinejoin="round"
            style={{ paintOrder: 'stroke fill' }}
          >
            <text
              x="600"
              y="122"
              textAnchor="middle"
              textLength="1192"
              lengthAdjust="spacingAndGlyphs"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: '134px',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              DESIGN FORGE
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
