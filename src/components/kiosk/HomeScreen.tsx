"use client";

import type { ReactNode } from "react";

export type HomeId = "has-appointment" | "no-appointment" | "delivery";

type HomeCard = {
  id: HomeId;
  title: string;
  en: string;
  hint: string;
  accent: string;
  icon: ReactNode;
};

const cards: HomeCard[] = [
  {
    id: "has-appointment",
    title: "お約束あり",
    en: "Appointment",
    hint: "ご用件をお選びください",
    accent: "from-[#1f7a4c] to-[#143d2e]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden>
        <rect x="8" y="12" width="32" height="26" rx="6" stroke="currentColor" strokeWidth="2" />
        <path d="M8 20h32M16 8v8M32 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="19" cy="28" r="1.6" fill="currentColor" />
        <circle cx="24" cy="28" r="1.6" fill="currentColor" />
        <circle cx="29" cy="28" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "no-appointment",
    title: "お約束なし",
    en: "Walk-in",
    hint: "資料ボックスへご案内します",
    accent: "from-[#c4a36a] to-[#8a6a32]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden>
        <path d="M14 10h16l8 8v20a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="2" />
        <path d="M30 10v8h8M18 26h12M18 32h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "delivery",
    title: "配送・集荷",
    en: "Delivery",
    hint: "担当者を呼び出します",
    accent: "from-[#6a8f3d] to-[#3f5a22]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden>
        <path d="M8 18 24 10l16 8v16L24 42 8 34V18Z" stroke="currentColor" strokeWidth="2" />
        <path d="M24 10v32M8 18l16 8 16-8" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export function HomeScreen({ onSelect }: { onSelect: (id: HomeId) => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="fade-up mt-6 mb-6 text-center">
        <h1 className="font-[family-name:var(--font-serif)] text-6xl font-medium tracking-[0.08em] text-[#15241c] lg:text-7xl">
          受付
        </h1>
        <p className="mt-3 text-lg font-medium text-[#4d5e55]">ご用件をお選びください</p>
      </div>
      <div className="fade-up-delay grid flex-1 grid-cols-3 gap-5 pb-2">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card.id)}
            className="tile glass flex h-full min-h-[220px] flex-col items-start justify-center gap-6 rounded-[1.8rem] p-7 text-left lg:p-8"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-[13px] tracking-[0.16em] text-[#c4a36a]">{card.en}</p>
              <p className="mt-2 whitespace-nowrap font-[family-name:var(--font-serif)] text-[2.5rem] font-medium leading-none tracking-[0.04em] text-[#15241c]">
                {card.title}
              </p>
              <p className="mt-3 text-base text-[#5b6c63]">{card.hint}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
