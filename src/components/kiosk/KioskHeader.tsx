"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function KioskHeader() {
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => {
      setNow(
        new Intl.DateTimeFormat("ja-JP", {
          weekday: "short",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="flex items-center justify-between gap-6">
      <Image
        src="/logo.png"
        alt="株式会社 Y Agency"
        width={280}
        height={72}
        priority
        unoptimized
        className="h-12 w-auto lg:h-14"
      />
      <p className="text-xl font-medium text-[#4d5e55] lg:text-2xl">{now}</p>
    </header>
  );
}
