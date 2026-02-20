import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: string;
  className?: string;
}

export default function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  const numericMatch = value.match(/^(\d+)/);
  const suffix = numericMatch ? value.slice(numericMatch[1].length) : "";
  const target = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const isNumeric = numericMatch !== null;

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(String(current));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, target, isNumeric]);

  if (!isNumeric) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
