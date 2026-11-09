import React, { useEffect, useState } from 'react';
import { PageRoute } from './TroveFooter';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onStartProject: (preselectedService?: string) => void;
}

/**
 * Authentic Design Forge Brand Mark using the uploaded `/assets/aistudio/Design_Forge_Brand_Kit__1__a553a9f9.svg`
 */
export const ForgeMark: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <img
    src="/assets/aistudio/Design_Forge_Brand_Kit__1__a553a9f9.svg"
    alt="Design Forge Emblem"
    className={`object-contain select-none ${className}`}
    draggable={false}
  />
);

export const NAV_PAGES: Array<{ label: string; path: PageRoute }> = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onStartProject,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, path: PageRoute) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full pt-4 pb-2 px-4 sm:px-6 lg:px-10 pointer-events-none">
      <div className="mx-auto w-full max-w-[1380px] pointer-events-auto">
        <div
          className={`flex h-16 w-full items-center justify-between gap-8 rounded-full border border-black/10 px-5 sm:px-7 transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-xl shadow-[0_14px_34px_rgba(20,20,19,0.10)]'
              : 'bg-white/90 backdrop-blur-md shadow-[0_8px_24px_rgba(20,20,19,0.06)]'
          }`}
        >
          {/* Zone 1: Actual Uploaded Design Forge Horizontal Brand Kit Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            aria-label="Design Forge Home"
            className="flex items-center shrink-0 focus-visible:ring-2 focus-visible:ring-[#901a1d] focus-visible:outline-none group"
          >
            <img
              src="/assets/aistudio/Design_Forge_Brand_Kit_fb5ce520.png"
              alt="Design Forge - Forging Ideas Into Reality"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              draggable={false}
            />
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links with Updraft Vertical Roll Hover */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-[14px] font-medium"
          >
            {NAV_PAGES.map((item) => {
              const isActive = currentPage === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`group relative overflow-hidden py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#901a1d] font-semibold'
                      : 'text-[#141413]/80 hover:text-[#141413]'
                  }`}
                >
                  <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-full block text-[#901a1d] font-semibold transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#901a1d]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action in Updraft Rounded-Full Pill + Dark Circle Arrow */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => onStartProject()}
              className="group inline-flex items-center gap-3 rounded-full bg-[#901a1d] hover:bg-[#141413] dark:hover:bg-white dark:hover:text-[#141413] text-white pl-5 pr-1.5 py-1.5 text-[13px] font-semibold tracking-[-0.01em] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_6px_18px_rgba(144,26,29,0.25)]"
            >
              <span>Start a project</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#141413] text-white dark:group-hover:bg-[#901a1d] transition-transform duration-200 group-hover:rotate-12">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Route Bar */}
        <nav
          aria-label="Mobile page navigation"
          className="mt-2 flex md:hidden items-center justify-between gap-1.5 overflow-x-auto rounded-full border border-[var(--border)] bg-[var(--panel)]/90 backdrop-blur-md px-3 py-1.5 text-[12px] font-medium shadow-[var(--elev-1)]"
        >
          {NAV_PAGES.map((item) => {
            const isActive = currentPage === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className={`rounded-full px-3 py-1 whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[#901a1d] text-white font-semibold'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

