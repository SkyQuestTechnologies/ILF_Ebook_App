"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement);
    };
    document.addEventListener("click", handleAnchorClick);

    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => lenis.scrollTo(el as HTMLElement), 100);
    }

    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
