import React from 'react';

export interface ClientLogoItem {
  id: string;
  name: string;
  src: string;
  scaleClass: string;
}

export const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    id: 'rotaract-3012',
    name: 'Rotaract District 3012',
    src: '/assets/aistudio/1_1322095b.png',
    scaleClass: 'scale-[1.28]',
  },
  {
    id: 'aggarwal-living',
    name: 'Aggarwal Living',
    src: '/assets/aistudio/2_64f1db40.png',
    scaleClass: 'scale-[1.08]',
  },
  {
    id: 'darima-cheese',
    name: 'Darima Cheese',
    src: '/assets/aistudio/3_908fe64b.png',
    scaleClass: 'scale-[1.08]',
  },
  {
    id: 'cirola',
    name: 'Ciróla',
    src: '/assets/aistudio/4_e349fba8.png',
    scaleClass: 'scale-[1.16]',
  },
  {
    id: 'namespace-bpit',
    name: 'Namespace BPIT',
    src: '/assets/aistudio/5_2f199e16.png',
    scaleClass: 'scale-[1.12]',
  },
  {
    id: 'opticlick',
    name: 'Opticlick',
    src: '/assets/PHOTOWALK.png',
    scaleClass: 'scale-[1.14]',
  },
  {
    id: 'rotaract-drishti',
    name: 'Rotaract Club BPIT Drishti',
    src: '/assets/aistudio/6_06b4b0f6.png',
    scaleClass: 'scale-[1.14]',
  },
];

export const ClientLogosMarquee: React.FC = () => {
  // Duplicate 3x for a seamless continuous marquee across all viewport widths
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      aria-label="Brands and institutions forged with Design Forge"
      className="py-10 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Updraft-Consistent Editorial Header on Warm Studio Paper */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d]">
              Selected Client Partnerships
            </p>
            <h2 className="mt-2 font-display text-[clamp(30px,3.8vw,52px)] leading-[0.98] tracking-[-0.03em] text-[var(--foreground)]">
              Brands &amp; institutions{' '}
              <span className="font-editorial italic font-normal text-[#901a1d]">
                forged
              </span>{' '}
              in our studio.
            </h2>
          </div>

          <p className="max-w-[380px] text-[15px] leading-[1.5] text-[var(--muted-foreground)]">
            Custom visual identities, logos, and print systems commissioned by commercial and institutional leaders.
          </p>
        </div>

        {/* Rounded-3xl Black Studio Stage Matching Updraft Card Architecture */}
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-black/15 bg-[#080808] py-6 sm:py-12 shadow-[0_24px_56px_-14px_rgba(20,20,19,0.22)]">
          {/* Edge Fade Mask */}
          <div className="relative z-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)]">
            <div className="forge-marquee-track flex w-max items-center gap-3 sm:gap-6 px-3 sm:px-6">
              {marqueeItems.map((logo, idx) => (
                <div
                  key={`${logo.id}-${idx}`}
                  className="group relative flex h-[120px] w-[180px] sm:h-[196px] sm:w-[272px] shrink-0 items-center justify-center rounded-[18px] sm:rounded-[24px] border border-white/[0.09] bg-[#111111] p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-[#151515]"
                  style={{
                    boxShadow:
                      '0 20px 42px -10px rgba(0, 0, 0, 0.92), 0 6px 18px -4px rgba(0, 0, 0, 0.75), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    draggable={false}
                    className={`h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 ${logo.scaleClass}`}
                    style={{
                      filter:
                        'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 2px 6px rgba(255, 255, 255, 0.08))',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

