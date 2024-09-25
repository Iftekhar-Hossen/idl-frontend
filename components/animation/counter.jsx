import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 *
 * @param root0
 * @param root0.value
 */
export function CounterAnimation({ value, direction = "up", className, index }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 80, // Lower damping for faster response
    stiffness: 200, // Higher stiffness for a snappier feel
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (index === 0 || isInView) {  // Manually trigger for the first item
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, index]);
  

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            latest.toFixed(0)
          );
        }
      }),
    [springValue]
  );

  return <span className={className} ref={ref} />;
}
