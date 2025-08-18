/*
  BlurText → smoother line-by-line animation (slide + fade-in)
*/

import { motion } from "motion/react";
import { useMemo } from "react";

const BlurText = ({
  text = "",
  delay = 300, // slightly more gap between lines
  className = "",
  stepDuration = 2, // slower for cinematic feel
}) => {
  const lines = text.split("\n");

  // From left & hidden
  const defaultFrom = useMemo(
    () => ({ x: -80, opacity: 0, filter: "blur(0px)" }),
    []
  );

  // To original position & visible
  const defaultTo = useMemo(
    () => ({ x: 0, opacity: 1, filter: "blur(0px)" }),
    []
  );

  return (
    <div className={`blur-text ${className} flex flex-col`}>
      {lines.map((line, index) => (
        <motion.p
          key={index}
          className="will-change-[transform,opacity,filter]"
          initial={defaultFrom}
          animate={defaultTo}
          transition={{
            duration: stepDuration,
            delay: (index * delay) / 1000,
            ease: [0.25, 1, 0.5, 1], // cubic-bezier "easeOutExpo" like
          }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
};

export default BlurText;
