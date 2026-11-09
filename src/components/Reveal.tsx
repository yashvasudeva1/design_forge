import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in ms
  direction?: 'up' | 'left' | 'right' | 'scale';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already in or above the viewport on mount, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96) {
      const timer = window.setTimeout(() => setVisible(true), delay);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const hiddenTransform =
    direction === 'left'
      ? 'translate3d(-24px, 0, 0)'
      : direction === 'right'
      ? 'translate3d(24px, 0, 0)'
      : direction === 'scale'
      ? 'translate3d(0, 16px, 0) scale(0.98)'
      : 'translate3d(0, 24px, 0)';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0, 0) scale(1)' : hiddenTransform,
        transition: `opacity 680ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 680ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
