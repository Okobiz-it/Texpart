"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;

  const observe = useCallback(
    (node: HTMLElement | null) => {
      if (!node || typeof IntersectionObserver === "undefined") return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              if (once) observer.unobserve(entry.target);
            } else if (!once) {
              entry.target.classList.remove("in-view");
            }
          });
        },
        { threshold, rootMargin }
      );

      // Observe the node and all its children with animation classes
      const animClasses = ["anim-fade-up", "anim-fade-left", "anim-fade-right", "anim-scale", "text-reveal"];
      const targets = node.querySelectorAll(
        animClasses.map(c => `.${c}`).join(", ")
      );
      
      // Also check if the node itself has an animation class
      if (animClasses.some(c => node.classList.contains(c))) {
        observer.observe(node);
      }

      targets.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    },
    [threshold, rootMargin, once]
  );

  return observe;
}

// Simple hook for a single element ref
export function useRevealRef(options: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

// Parallax scroll hook
export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = `translateY(${scrolled * speed * -1}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}
