// AnimationContext.tsx
import React, { createContext, useContext, useEffect, ReactNode } from "react";

interface AnimationContextType {
  // Add any context values you might need in the future
}

const AnimationContext = createContext<AnimationContextType>({});

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps): React.ReactNode {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal-project");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <AnimationContext.Provider value={{}}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation(): AnimationContextType {
  return useContext(AnimationContext);
}