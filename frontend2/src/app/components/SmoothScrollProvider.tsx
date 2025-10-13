"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveRef = useRef<any>(null);
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeScroll = async () => {
      try {
        // Wait for DOM to be fully ready
        await new Promise(resolve => {
          if (document.readyState === 'complete') {
            resolve(void 0);
          } else {
            window.addEventListener('load', () => resolve(void 0));
          }
        });

        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        
        if (scrollRef.current && !locomotiveRef.current) {
          // Destroy any existing instance
          if (locomotiveRef.current) {
            locomotiveRef.current.destroy();
          }

          locomotiveRef.current = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 0.8,
            class: "is-reveal",
            scrollbarContainer: false,
            reloadOnContextChange: true,
            touchMultiplier: 2,
            firefoxMultiplier: 50
          });

          // Multiple update attempts to ensure proper initialization
          const updateScroll = () => {
            if (locomotiveRef.current) {
              locomotiveRef.current.update();
            }
          };

          setTimeout(updateScroll, 100);
          setTimeout(updateScroll, 300);
          setTimeout(updateScroll, 500);
          setTimeout(updateScroll, 1000);

          setIsLoaded(true);
        }
      } catch (error) {
        console.warn("Failed to initialize Locomotive Scroll:", error);
      }
    };

    initializeScroll();

    return () => {
      if (locomotiveRef.current) {
        try {
          locomotiveRef.current.destroy();
          locomotiveRef.current = null;
        } catch (error) {
          console.warn("Failed to destroy Locomotive Scroll:", error);
        }
      }
    };
  }, []);

  // Update scroll on route change
  useEffect(() => {
    if (isLoaded && locomotiveRef.current) {
      const updateScroll = () => {
        if (locomotiveRef.current) {
          locomotiveRef.current.update();
        }
      };

      // Multiple updates to ensure proper re-initialization on route change
      setTimeout(updateScroll, 50);
      setTimeout(updateScroll, 150);
      setTimeout(updateScroll, 300);
    }
  }, [pathname, isLoaded]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (locomotiveRef.current) {
        setTimeout(() => {
          locomotiveRef.current?.update();
        }, 150);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container className="min-h-screen">
      {children}
    </div>
  );
}