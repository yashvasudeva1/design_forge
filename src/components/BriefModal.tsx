import React, { useState, useEffect, useMemo } from 'react';
import { CONTACT_INFO, FORGE_SERVICES, ForgeProject } from '../data/forgeData';
import {
  BriefValidationErrors,
  computeBriefProgress,
  normalizeBriefInput,
  SMART_SCOPE_TEMPLATES,
  validateProjectBrief,
} from '../utils/archiveLogic';
import { X, Check, AlertCircle, ArrowUpRight, Copy, Sparkles, ChevronDown } from 'lucide-react';

interface BriefModalProps {
  isOpen: boolean;
  initialService?: string;
  initialNote?: string;
  recentlyViewed?: ForgeProject[];
  onClose: () => void;
  onSubmittedCountChange?: () => void;
}

export const BriefModal: React.FC<BriefModalProps> = ({
  isOpen,
  initialService = 'Brand Identity',
  initialNote = '',
  recentlyViewed = [],
  onClose,
  onSubmittedCountChange,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(initialService);
  const [timelinePref, setTimelinePref] = useState('Standard (2-4 weeks)');
  const [message, setMessage] = useState(initialNote);
  const [errors, setErrors] = useState<BriefValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [dossierRef, setDossierRef] = useState('DF-2026-8410');
  const [copiedRef, setCopiedRef] = useState(false);
  const [attachedToast, setAttachedToast] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  useEffect(() => {
    if (initialNote) setMessage(initialNote);
  }, [initialNote]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const progress = useMemo(
    () =>
      computeBriefProgress({
        name,
        email,
        company,
        service,
        message,
      }),
    [name, email, company, service, message]
  );

  const selectedServiceObj = useMemo(
    () => FORGE_SERVICES.find((s) => s.title === service) || FORGE_SERVICES[1],
    [service]
  );

  if (!isOpen) return null;

  const handleApplyTemplate = (tplService: string, snippet: string, label: string) => {
    setService(tplService);
    setMessage((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return snippet;
      if (trimmed.includes(snippet)) return trimmed;
      return `${trimmed}\n\n${snippet}`;
    });
    if (errors.message) setErrors({ ...errors, message: undefined });
    setAttachedToast(`Applied ${label.replace('+ ', '')}`);
    window.setTimeout(() => setAttachedToast(null), 2200);
  };

  const handleAttachProjectRef = (proj: ForgeProject) => {
    const refNote = `Reference Specimen: ${proj.title} (${proj.specimenCode} - ${proj.category}).`;
    setMessage((prev) => {
      const trimmed = prev.trim();
      if (trimmed.includes(proj.specimenCode)) return trimmed;
      return trimmed ? `${trimmed}\n${refNote}` : `${refNote} We are looking for a similar level of craft and visual direction.`;
    });
    if (errors.message) setErrors({ ...errors, message: undefined });
    setAttachedToast(`Attached ${proj.title}`);
    window.setTimeout(() => setAttachedToast(null), 2200);
  };

  const handleBlurNormalize = () => {
    const norm = normalizeBriefInput({ name, email, company, service, message });
    setName(norm.name);
    setEmail(norm.email);
    setCompany(norm.company || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateProjectBrief({
      name,
      email,
      company,
      service,
      message,
    });

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setName(result.normalized.name);
    setEmail(result.normalized.email);
    setCompany(result.normalized.company || '');
    setMessage(result.normalized.message);
    setErrors({});

    const codeNum = 1000 + ((result.normalized.name.length * 137 + result.normalized.message.length * 43) % 8999);
    setDossierRef(`DF-2026-${codeNum}`);
    setSubmitted(true);
    if (onSubmittedCountChange) onSubmittedCountChange();
  };

  const handleCopyRef = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${dossierRef} | ${service} Commission for ${name} (${email})`
      ).catch(() => {});
    }
    setCopiedRef(true);
    window.setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brief-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-[var(--border)] bg-[var(--panel)] shadow-[var(--elev-5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar (Jakob's Law + Fitts's Law 44px Close Button) */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-3.5">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            <span className="bg-[#901a1d] px-2 py-0.5 text-white font-semibold">
              Studio Intake
            </span>
            <span>24-48h Scoped Direction</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project brief modal"
            className="flex h-11 w-11 items-center justify-center border border-[var(--border)] text-[var(--foreground)] hover:border-[#901a1d] hover:bg-[#901a1d] hover:text-white transition-colors duration-150 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Goal-Gradient Progress Bar */}
        {!submitted && (
          <div className="border-b border-[var(--border)] bg-[var(--shell)] px-6 py-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] mb-1.5">
              <span className="text-[var(--foreground)] font-semibold">
                Commission Readiness · Step {progress.completedSteps} of {progress.totalSteps}
              </span>
              <span className="text-[#901a1d] font-semibold tabular-nums">
                {progress.percent}% Complete
              </span>
            </div>
            <div className="h-1.5 w-full bg-[var(--border)] overflow-hidden">
              <div
                className="h-full bg-[#901a1d] transition-transform duration-200 origin-left"
                style={{ transform: `scaleX(${progress.percent / 100})` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left 7 Columns: Form or Peak-End Confirmation Dossier */}
          <div className="lg:col-span-7 p-6 sm:p-9 border-b lg:border-b-0 lg:border-r border-[var(--border)]">
            <h2
              id="brief-modal-title"
              className="font-display text-3xl sm:text-4xl leading-[1.02] tracking-[-0.025em] text-[var(--foreground)]"
            >
              Let’s forge your brand.
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Select a scope template or describe your vision below. Our senior design directors respond within 24-48 hours.
            </p>

            {submitted ? (
              /* Peak-End Rule: Memorable Studio Commission Dossier Receipt */
              <div className="mt-7 border border-black bg-[#070707] text-white p-6 sm:p-8 shadow-[var(--elev-4)] animate-stage-swap">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center bg-[#901a1d] text-white">
                      <Check className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#901a1d]">
                        Commission Logged · Dossier Active
                      </div>
                      <h3 className="font-display text-2xl text-white">
                        Message Received.
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white hover:border-[#901a1d] hover:bg-[#901a1d] transition-colors duration-150 cursor-pointer"
                  >
                    <Copy className="w-3 h-3 shrink-0" />
                    <span>{copiedRef ? 'Copied ID' : dossierRef}</span>
                  </button>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-white/80">
                  Thank you, <strong className="text-white">{name}</strong>. Your{' '}
                  <strong className="text-white">{service}</strong> brief ({timelinePref}) has been assigned reference{' '}
                  <span className="font-mono text-xs text-[#901a1d] font-semibold">{dossierRef}</span>. We will send a scoped direction to{' '}
                  <span className="font-mono text-xs text-white underline">{email}</span> within 24-48 hours.
                </p>

                {/* 3-Step Next Actions Timeline */}
                <div className="mt-6 border-t border-white/12 pt-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50 mb-3">
                    What Happens Next
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { step: '01 · 0-12h', label: 'Senior Director Audit' },
                      { step: '02 · 24-48h', label: 'Scoped Proposal & Timeline' },
                      { step: '03 · Kickoff', label: 'Stage 01 Research & Sketch' },
                    ].map((s) => (
                      <div key={s.step} className="border border-white/12 bg-white/[0.03] p-3">
                        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#901a1d]">
                          {s.step}
                        </div>
                        <div className="mt-1 font-nav text-xs font-semibold text-white">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/12 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-[#901a1d] text-white font-nav font-bold text-[11px] uppercase tracking-[0.12em] px-5 py-3 hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer"
                  >
                    Send Another Request
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="border border-white/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-white/75 hover:text-white cursor-pointer"
                  >
                    Return to Studio
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                {/* Tesler's Law: 1-Click Smart Scope Builders */}
                <div className="border border-[var(--border)] bg-[var(--shell)]/60 p-3.5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--foreground)] font-semibold">
                      <Sparkles className="w-3 h-3 text-[#901a1d]" />
                      <span>1-Click Smart Scope Templates</span>
                    </span>
                    {attachedToast && (
                      <span className="font-mono text-[10px] text-[#901a1d] font-semibold">
                        ✓ {attachedToast}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SMART_SCOPE_TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => handleApplyTemplate(tpl.service, tpl.snippet, tpl.label)}
                        className="border border-[var(--border)] bg-[var(--panel)] px-2.5 py-1.5 font-mono text-[10px] text-[var(--foreground)] hover:border-[#901a1d] hover:bg-[#901a1d] hover:text-white transition-colors duration-150 cursor-pointer"
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recognition > Recall: Recently Inspected Works */}
                {recentlyViewed.length > 0 && (
                  <div className="border border-[var(--border)] bg-[var(--panel)] p-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)] mb-2">
                      Recently Inspected Specimens · Click to attach as reference
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentlyViewed.slice(0, 3).map((proj) => (
                        <button
                          key={proj.id}
                          type="button"
                          onClick={() => handleAttachProjectRef(proj)}
                          className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--shell)] px-2.5 py-1 text-left hover:border-[#901a1d] transition-colors duration-150 cursor-pointer"
                        >
                          <img
                            src={proj.image}
                            alt={proj.title}
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 object-cover"
                          />
                          <span className="font-mono text-[10px] text-[var(--foreground)]">
                            + {proj.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="brief-name"
                      className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-foreground)] mb-1.5"
                    >
                      <span>
                        Your Name <span className="text-[#901a1d]">*</span>
                      </span>
                      {progress.fieldValid.name && (
                        <span className="text-[#901a1d] font-bold">✓ Valid</span>
                      )}
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      value={name}
                      onBlur={handleBlurNormalize}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="Aarav Sharma"
                      className={`w-full min-h-[44px] border bg-[var(--shell)]/40 px-3.5 py-2.5 text-base sm:text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus:outline-none focus:border-[#901a1d] transition-colors duration-150 ${
                        errors.name ? 'border-[#901a1d]' : 'border-[var(--border)]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-[#901a1d]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="brief-email"
                      className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-foreground)] mb-1.5"
                    >
                      <span>
                        Email Address <span className="text-[#901a1d]">*</span>
                      </span>
                      {progress.fieldValid.email && (
                        <span className="text-[#901a1d] font-bold">✓ Valid</span>
                      )}
                    </label>
                    <input
                      id="brief-email"
                      type="email"
                      value={email}
                      onBlur={handleBlurNormalize}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="aarav@company.com"
                      className={`w-full min-h-[44px] border bg-[var(--shell)]/40 px-3.5 py-2.5 text-base sm:text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus:outline-none focus:border-[#901a1d] transition-colors duration-150 ${
                        errors.email ? 'border-[#901a1d]' : 'border-[var(--border)]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-[#901a1d]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="brief-service"
                    className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-foreground)] mb-1.5"
                  >
                    <span>Discipline · Recognizable Deliverable Preview</span>
                    <span className="text-[#901a1d] font-semibold">
                      Est. {selectedServiceObj.timeline.replace('–', '-')}
                    </span>
                  </label>
                  <select
                    id="brief-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full min-h-[44px] border border-[var(--border)] bg-[var(--shell)]/40 px-3.5 py-2.5 text-base sm:text-sm text-[var(--foreground)] focus:outline-none focus:border-[#901a1d]"
                  >
                    {FORGE_SERVICES.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.num}. {s.title} ({s.timeline.replace('–', '-')}) - {s.tagline}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="brief-message"
                    className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-foreground)] mb-1.5"
                  >
                    <span>
                      Project Details <span className="text-[#901a1d]">*</span>
                    </span>
                    {progress.fieldValid.message ? (
                      <span className="text-[#901a1d] font-bold">✓ Ready</span>
                    ) : (
                      <span>{Math.max(0, 10 - message.trim().length)} chars needed</span>
                    )}
                  </label>
                  <textarea
                    id="brief-message"
                    rows={3}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Tell us about your project, goals, and any inspiration you have..."
                    className={`w-full border bg-[var(--shell)]/40 px-3.5 py-2.5 text-base sm:text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus:outline-none focus:border-[#901a1d] transition-colors duration-150 ${
                      errors.message ? 'border-[#901a1d]' : 'border-[var(--border)]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-[#901a1d]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Progressive Disclosure: Optional Organization & Timeline Parameters */}
                <details className="group border border-[var(--border)] bg-[var(--shell)]/30">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] [&::-webkit-details-marker]:hidden">
                    <span>Optional · Company Name &amp; Timeline Priority</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-150 group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-[var(--border)] p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="brief-company"
                        className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-foreground)] mb-1"
                      >
                        Company / Organization
                      </label>
                      <input
                        id="brief-company"
                        type="text"
                        value={company}
                        onBlur={handleBlurNormalize}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Your Company (optional)"
                        className="w-full min-h-[40px] border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#901a1d]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="brief-timeline"
                        className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-foreground)] mb-1"
                      >
                        Target Cadence
                      </label>
                      <select
                        id="brief-timeline"
                        value={timelinePref}
                        onChange={(e) => setTimelinePref(e.target.value)}
                        className="w-full min-h-[40px] border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none focus:border-[#901a1d]"
                      >
                        <option value="Expedited (3-7 days)">Expedited (3-7 days)</option>
                        <option value="Standard (2-4 weeks)">Standard (2-4 weeks)</option>
                        <option value="Comprehensive (4-6 weeks)">Comprehensive (4-6 weeks)</option>
                      </select>
                    </div>
                  </div>
                </details>

                <button
                  type="submit"
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-[#901a1d] text-white font-nav font-bold text-[12px] uppercase tracking-[0.14em] px-5 py-3.5 hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors duration-150 cursor-pointer"
                >
                  <span>Send Message</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right 5 Columns: Included Deliverables Preview (Recognition > Recall) & Direct Studio Lines */}
          <div className="lg:col-span-5 p-6 sm:p-9 bg-[var(--shell)]/40 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Included Deliverables for Selected Service */}
              <div className="border border-[var(--border)] bg-[var(--panel)] p-4">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[#901a1d]">
                  <span>Selected Discipline</span>
                  <span>{selectedServiceObj.num} / 06</span>
                </div>
                <div className="mt-1 font-display text-2xl text-[var(--foreground)]">
                  {selectedServiceObj.title}
                </div>
                <div className="mt-3 pt-3 border-t border-[var(--border)] space-y-1.5">
                  {selectedServiceObj.deliverables.map((del, i) => (
                    <div
                      key={del}
                      className="flex items-center gap-2 font-mono text-[11px] text-[var(--muted-foreground)]"
                    >
                      <span className="text-[#901a1d] font-semibold">0{i + 1}</span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  Direct Studio Desk
                </h3>
                <div className="mt-2.5 space-y-2 text-sm">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="block font-medium text-[var(--foreground)] hover:text-[#901a1d] transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                  <div className="pt-1 space-y-1 font-mono text-xs text-[var(--muted-foreground)] tabular-nums">
                    {CONTACT_INFO.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="block hover:text-[var(--foreground)] transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-5">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  Working Hours (IST)
                </h3>
                <div className="mt-2.5 space-y-1.5">
                  {CONTACT_INFO.workingHours.map((wh) => (
                    <div
                      key={wh.day}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-[var(--muted-foreground)]">{wh.day}</span>
                      <span className="font-mono text-[var(--foreground)] tabular-nums">
                        {wh.hours.replace('–', '-')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-5">
              <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                Studio Location
              </span>
              <p className="mt-1 font-display text-3xl text-[var(--foreground)]">
                Delhi, India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
