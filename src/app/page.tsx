"use client";

import Card from "@/components/Card";
import colors from "@/../public/wallpaper.png";
import Image from "next/image";

const Home = () => {
  return (
    <main className="relative h-screen w-screen">
      <Image src={colors.src} fill alt="colors" className="object-cover opacity-80" />

      <Card />
    </main>
  );
};

export default Home;
