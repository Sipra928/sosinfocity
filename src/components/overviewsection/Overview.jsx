import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "@studio-freight/lenis";

import "./styles.css";

const Overview = ({img, heading, desc}) => {


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Lenis smooth scroll
    const lenis = new Lenis();
    const raf = (time) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Per work-item animations
    gsap.utils.toArray(".work-item").forEach((item) => {
      const imgWrap = item.querySelector(".work-item-img");   // ⬅️ animate wrapper
      const nameH1  = item.querySelector(".work-item-name h1");
      if (!imgWrap || !nameH1) return;

      // SplitText
      const split = SplitText.create(nameH1, { type: "chars"});
      gsap.set(split.chars, { y: "15%" });
      

      // Per-char scrub
      split.chars.forEach((char, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: `top+=${index * 25 - 250} top`,
          end:   `top+=${index * 25 - 100} top`,
          scrub: 1,
          animation: gsap.fromTo(
            char,
            { y: "125%" },
            { y: "0%", ease: "none" }
          ),
        });
      });

      // Image clip-path: enter (top reveal)
      ScrollTrigger.create({
        trigger: item,
        start: "top bottom",
        end:   "top top",
        scrub: 0.5,
        animation: gsap.fromTo(
          imgWrap,
          { clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none", immediateRender: false }
        ),
      });

      // If you want the exit/morph on scroll out, uncomment:
      ScrollTrigger.create({
        trigger: item,
        start: "bottom bottom",
        end:   "bottom top",
        scrub: 0.5,
        animation: gsap.fromTo(
          imgWrap,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)", ease: "none" }
        ),
      });
    });

    // Cleanup
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
        <section className="work-item">
          <div className="work-item-img">
            <img src={img} alt={`Work `} />
          </div>
          {/* <div className="work-item-name">
            <h1>Work {idx}</h1>
          </div> */}
          <div className="work-item-name">
            <h1>{heading}</h1>
          </div>
          <div className="work-item-desc">
            <p>{desc}</p>
          </div>

        </section>

     
    </>
  );
};

export default Overview;
