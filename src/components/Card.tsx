"use client";

import useMouse from "@/hooks/useMouse";
import { useTransform, motion, useMotionTemplate } from "motion/react";
import { useRef } from "react";
import noise from "@/../public/noise.png";
import logo from "@/../public/logo.svg";
import Image from "next/image";

const Card = () => {
  const { x, y } = useMouse();
  const ref = useRef<HTMLDivElement>(null);
  const dampen = 80;

  const rotateX = useTransform<number, number>(y, (value) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const deltaY = value - centerY;
    return deltaY / ((dampen * 4) / 7);
  });

  const rotateY = useTransform<number, number>(x, (value) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const deltaX = value - centerX;
    return -deltaX / dampen;
  });

  const diagonalMovement = useTransform<number, number>(
    [rotateX, rotateY],
    ([newRotateX, newRotateY]) => {
      const position: number = newRotateX + newRotateY;
      return position;
    },
  );

  const sheenPosition = useTransform(diagonalMovement, [-5, 5], [-100, 200]);
  const sheenOpacity = useTransform(
    sheenPosition,
    [-100, 50, 200],
    [0, 0.05, 0],
  );
  const sheenGradient = useMotionTemplate`linear-gradient(55deg, transparent, rgba(255 255 255 / ${sheenOpacity}) ${sheenPosition}%, transparent)`;

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      className="relative flex h-screen items-center justify-center transform-3d"
    >
      {/* CARD */}
      <motion.div
        ref={ref}
        style={{ backgroundImage: sheenGradient }}
        className="relative h-[400px] w-[700px] cursor-pointer overflow-hidden rounded-2xl border border-[#F0F1F233] p-8 shadow-[0px_4px_30px_0px_rgba(0,0,0,0.15)] backdrop-blur-4xl backdrop-brightness-110"
      >
        <Image src={noise.src} fill alt="colors" className="absolute -z-10" />
        <div className="relative size-full">
          <Image
            src={logo.src}
            width={40}
            height={40}
            alt="logo"
            className="absolute top-0 right-0 opacity-50"
          />
          <div className="absolute bottom-0 left-0">
            <h3 className="text-5xl text-foreground">ETHAN LEE</h3>
            <p className="text-foreground opacity-80">SOFTWARE DEVELOPER</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
