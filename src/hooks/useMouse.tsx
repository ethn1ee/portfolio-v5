"use client";

import { MotionValue, useMotionValue } from "motion/react";
import { useEffect } from "react";

type MousePosition = {
  x: MotionValue;
  y: MotionValue;
};

const useMouse = (): MousePosition => {
  const size = 20;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      mouse.x.set(clientX - size / 2);
      mouse.y.set(clientY - size / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse.x, mouse.y]);

  return mouse;
};

export default useMouse;
