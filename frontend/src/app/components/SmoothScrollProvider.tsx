"use client";

import { useEffect, useRef } from "react";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let locomotiveScroll: any;

    const initializeScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      
      if (scrollRef.current) {
        locomotiveScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 0.8,
          class: "is-reveal",
          scrollbarContainer: false
        });
      }
    };

    // Wait for the component to mount before initializing
    const timeoutId = setTimeout(initializeScroll, 100);

    return () => {
      clearTimeout(timeoutId);
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container className="min-h-screen">
      {children}
    </div>
  );
}