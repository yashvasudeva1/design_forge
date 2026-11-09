import React, { useState } from 'react';
import { CONTACT_INFO, FAQ_ITEMS } from '../data/forgeData';
import { ForgeMark } from './Navbar';
import { ArrowUpRight } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(FAQ_ITEMS[0]?.id || 'what-is-df');
  const activeItem =
    FAQ_ITEMS.find((item) => item.id === activeId) || FAQ_ITEMS[0];

  const handleSelectQuestion = (id: string) => {
    setActiveId(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const panel = document.getElementById('faq-answer-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  return (
    <section
      id="questions"
      aria-labelledby="faq-title"
      className="scroll-mt-20 pt-16 lg:pt-24 pb-8 lg:pb-12"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-t border-[var(--border)] pt-12">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d]">
              Ask Us Anything
            </p>
            <h2
              id="faq-title"
              className="mt-2 font-display text-[clamp(36px,4.8vw,72px)] leading-[0.95] tracking-[-0.03em] text-[var(--foreground)]"
            >
              Direct answers from{' '}
              <span className="font-editorial italic font-normal text-[#901a1d]">
                the forge.
              </span>
            </h2>
          </div>

          <span className="text-[13px] font-medium text-[var(--muted-foreground)]">
            0{FAQ_ITEMS.length} Common Client Questions
          </span>
        </div>

        {/* Updraft Interactive Two-Column Studio DM / Q&A Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 5 Columns: Clickable Question Prompts */}
          <div
            role="tablist"
            aria-label="Client questions"
            className="lg:col-span-5 flex flex-col gap-2.5"
          >
            {FAQ_ITEMS.map((item, idx) => {
              const isSelected = item.id === activeItem.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectQuestion(item.id)}
                  className={`w-full text-left rounded-[22px] border p-4 sm:p-5 transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'border-[#901a1d] bg-[#141413] text-white shadow-[var(--elev-3)]'
                      : 'border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] hover:border-[#901a1d]/50'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.1em] mt-0.5 ${
                        isSelected ? 'text-[#e15b5e] font-semibold' : 'text-[#901a1d]'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="font-nav text-[15px] sm:text-[16px] font-semibold leading-[1.35]">
                      {item.question}
                    </span>
                  </div>
                  <span
                    className={`mt-0.5 font-mono text-xs shrink-0 ${
                      isSelected ? 'text-[#e15b5e]' : 'text-[var(--muted-foreground)]'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: Active Studio Reply Thread Card */}
          <div
            id="faq-answer-panel"
            role="tabpanel"
            className="lg:col-span-7 rounded-[28px] border border-[var(--border)] updraft-card-surface p-6 sm:p-10 shadow-[var(--elev-3)] flex flex-col justify-between min-h-[360px] sm:min-h-[380px]"
          >
            <div>
              {/* Top Thread Header */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2efe9] border border-black/10 shadow-sm">
                    <ForgeMark className="w-6 h-6" />
                  </span>
                  <div>
                    <div className="font-nav text-sm font-bold text-[var(--foreground)]">
                      Design Forge Studio Desk
                    </div>
                    <div className="text-[12px] text-[var(--muted-foreground)]">
                      Delhi, India · Direct Studio Reply
                    </div>
                  </div>
                </div>
                <span className="text-[12px] font-semibold text-[#901a1d]">
                  Verified Answer
                </span>
              </div>

              {/* Client Prompt Bubble */}
              <div className="rounded-2xl bg-[var(--shell)] border border-[var(--border)] px-5 py-4 mb-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  Client Question
                </div>
                <div className="mt-1 font-display text-[20px] sm:text-[22px] leading-[1.25] text-[var(--foreground)]">
                  “{activeItem.question}”
                </div>
              </div>

              {/* Studio Answer */}
              <div className="space-y-4 text-[16px] sm:text-[17px] leading-[1.65] text-[var(--foreground)]">
                {activeItem.answer.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className={
                      pIdx === 0
                        ? 'text-[var(--foreground)] font-medium'
                        : 'text-[var(--muted-foreground)]'
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                Still have a specific brief question?
              </span>
              <a
                href={`mailto:${CONTACT_INFO.email}?subject=Question%20for%20Design%20Forge`}
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#901a1d] font-semibold hover:underline"
              >
                <span>Write to {CONTACT_INFO.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
