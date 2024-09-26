import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
export function Reveal({ children, width = "fit-content" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);
  return (
    <div
      ref={ref}
      style={{
        width: width,
      }}
      className="relative m-auto"
    >
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 20,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        transition={{
          duration: 0.5,
          delay: 0.3,
        }}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{
          duration: 0.5,
          ease: "easeIn",
        }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        className="bg-primary"
      ></motion.div>
    </div>
  );
}
