"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  distance?: string;
  start?: string;
}

export default function RevealGroup({
  children,
  className,
  stagger = 100,
  distance = "2em",
  start = "top 80%",
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(
    () => {
      if (!ref.current || prefersReduced) return;
      const children = Array.from(ref.current.children).filter(
        (el) => el.nodeType === 1
      ) as HTMLElement[];
      if (!children.length) return;

      gsap.set(children, { y: distance, autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: ref.current,
        start,
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          children.forEach((child, i) => {
            tl.to(
              child,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power4.inOut",
                onComplete: () => gsap.set(child, { clearProps: "all" }),
              },
              i * (stagger / 1000)
            );
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
