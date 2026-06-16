"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type HeadingTag = "h1" | "h2" | "h3";

interface SplitHeadlineProps {
  as?: HeadingTag;
  children: React.ReactNode;
  className?: string;
  scrollStart?: string;
  scrollEnd?: string;
  triggerOnLoad?: boolean;
}

export default function SplitHeadline({
  as: Tag = "h2",
  children,
  className,
  scrollStart = "top 90%",
  scrollEnd = "center 40%",
  triggerOnLoad = false,
}: SplitHeadlineProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(
    () => {
      if (!ref.current || prefersReduced) return;
      const el = ref.current;

      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          const lines = self.lines;
          const count = lines.length;
          const tl = gsap.timeline(
            triggerOnLoad
              ? {}
              : {
                  scrollTrigger: {
                    trigger: el,
                    start: scrollStart,
                    end: scrollEnd,
                  },
                }
          );
          lines.forEach((line, i) => {
            const staggerOffset =
              (i * (0.135 + 0.03 * count)) / (count > 1 ? count - 1 : 1) +
              0.15;
            tl.fromTo(
              line,
              { yPercent: 80, scale: 0.96, opacity: 0, rotation: 1.5, transformOrigin: "0% 100%" },
              { yPercent: 0, scale: 1, opacity: 1, rotation: 0, ease: "expo.out", duration: 1.05 },
              staggerOffset
            );
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as React.Ref<any>} className={className}>
      {children}
    </Tag>
  );
}
