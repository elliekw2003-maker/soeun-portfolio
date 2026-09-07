"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function ProjectReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || motion.matches || !window.IntersectionObserver || !element.animate) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      // Animate only on entry. The server-rendered content is visible by default.
      animation = element.animate(
        [{ opacity: 0.45, transform: "translateY(20px)" }, { opacity: 1, transform: "none" }],
        { duration: 550, easing: "cubic-bezier(0.2, 0.65, 0.3, 1)" },
      );
      observer.disconnect();
    }, { threshold: 0.08 });

    const stopMotion = () => {
      if (motion.matches) {
        observer.disconnect();
        animation?.cancel();
      }
    };
    observer.observe(element);
    motion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animation?.cancel();
      motion.removeEventListener("change", stopMotion);
    };
  }, []);

  return <article ref={ref} className="project">{children}</article>;
}
