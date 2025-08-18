import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CctvCamera = ({
  title = "ROHIT",
  paragraph = "",
  bgImage = "",
  buttonText = "",
  buttonOnClick = () => {},
  scrubSpeed = 1.5, // Increased for smoother transition
  containerHeight = "h-screen",
  isFirst = true // New prop to identify first component
}) => {
  const containerRef = useRef(null);
  const trapeziumRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const trapezium = trapeziumRef.current;
    const container = containerRef.current;
    const content = contentRef.current;

    if (!trapezium || !container) return;

    // Initial states
    gsap.set(trapezium, {
      clipPath: "polygon(20% 0%, 80% 20%, 100% 100%, 0% 100%)"
    });
    gsap.set(content, { opacity: 0, y: 30 });

    // Calculate start/end positions based on component order
    const startPos = isFirst ? "top bottom" : "top 80%";
    const endPos = isFirst ? "top 20%" : "top top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: startPos,
        end: endPos,
        scrub: scrubSpeed,
        markers: true,
      }
    });

    // 1. Expand to rectangle (smoother easing)
    tl.to(trapezium, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "sine.inOut",
      duration: 1
    }, 0);

    // 2. Fade in content (staggered)
    tl.to(content, {
      opacity: 1,
      y: 0,
      ease: "back.out(1.7)",
      duration: 0.8
    }, 0.3);

    // 3. Collapse to trapezoid (with overlap)
    tl.to(trapezium, {
      clipPath: "polygon(0% 0%, 100% 0%, 80% 80%, 20% 100%)",
      ease: "sine.inOut",
      duration: 1
    }, "+=0.3");

  }, [scrubSpeed, isFirst]);

  return (
    <div ref={containerRef} className="w-full relative">
      <div
        ref={trapeziumRef}
        className={`${containerHeight} w-full relative overflow-hidden`}
        style={{
          clipPath: "polygon(20% 0%, 80% 20%, 100% 100%, 0% 100%)",
          willChange: "clip-path",
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div 
          ref={contentRef}
          className="h-full w-full flex flex-col items-center justify-center gap-6 px-4"
        >
          {buttonText && (
            <button
              onClick={buttonOnClick}
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded shadow-lg transition-all hover:scale-105"
            >
              {buttonText}
            </button>
          )}

          {title && (
            <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
              {title}
            </h1>
          )}

          {paragraph && (
            <p className="text-lg md:text-xl max-w-3xl text-white text-center">
              {paragraph}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Usage example with multiple cameras
const App = () => {
  return (
    <>
      <CctvCamera 
        title="FIRST SECTION"
        paragraph="This is the opening animation"
        isFirst={true}
      />
      <CctvCamera 
        title="SECOND SECTION"
        paragraph="This starts while first is ending"
        isFirst={false}
      />
      <CctvCamera 
        title="THIRD SECTION"
        paragraph="Seamless transition continues"
        isFirst={false}
      />
    </>
  );
};

export default CctvCamera;