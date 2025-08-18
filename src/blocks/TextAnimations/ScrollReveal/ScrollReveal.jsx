import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  baseOpacity = 0,
  yOffset = 50,
  containerClassName = "",
  textClassName = "",
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // Target ALL child nodes (text + image)
    const targets = el.querySelectorAll("*");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: baseOpacity, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 100%", // animate a bit earlier
            end: "bottom 70%", // ensure full reveal
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert(); // cleanup only local triggers
  }, [scrollContainerRef, baseOpacity, yOffset]);

  return (
    <div ref={containerRef} className={`my-5 ${containerClassName}`}>
      <div className={`${textClassName}`}>{children}</div>
    </div>
  );
};

export default ScrollReveal;
