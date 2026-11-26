"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds, for a short stagger between siblings. */
  delay?: number;
  as?: "div" | "li";
};

/**
 * Fades content up the first time it scrolls into view.
 * Without JavaScript, or with reduced motion on, content is simply visible
 * (see the .reveal rules in globals.css).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal ${visible ? "is-visible" : ""} ${className}`.trim(),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  );
}
