import { useState, useEffect } from "react";

export function useScaleRatio(designWidth = 1440) {
  const [scale, setScale] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth / designWidth;
    }
    return 1;
  });

  useEffect(() => {
    const handleResize = () => {
      // Calculate scale relative to design canvas width
      setScale(window.innerWidth / designWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [designWidth]);

  return scale;
}
