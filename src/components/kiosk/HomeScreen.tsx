"use client";

import type { ReactNode } from "react";

type HomeCard = {
  id: "appointment" | "interview" | "delivery" | "sales" | "other";
  title: string;
  en: string;
  hint: string;
  accent: string;
  icon: ReactNode;
};

const cards: HomeCard[] = [
  {
    id: "appointment",
    title: "お約束のある方",
    en: "Appointment",
    hint: "担当者へご案内します",
    accent: "from-[#1f7a4c] to-[#143d2e]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <rect x="8" y="12" width="32" height="26" rx="6" stroke="currentColor" strokeWidth="2" />
        <path d="M8 20h32M16 8v8M32 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="19" cy="28" r="1.6" fill="currentColor" />
        <circle cx="24" cy="28" r="1.6" fill="currentColor" />
        <circle cx="29" cy="28" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "interview",
    title: "採用・面接の方",
    en: "Interview",
    hint: "採用担当がご対応します",
    accent: "from-[#2a9b8f] to-[#14635c]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M10 38c2.4-7 8-11 14-11s11.6 4 14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "delivery",
    title: "配送・納品業者様",
    en: "Delivery",
    hint: "受領・置き配をご選択ください",
    accent: "from-[#6a8f3d] to-[#3f5a22]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <path d="M8 18 24 10l16 8v16L24 42 8 34V18Z" stroke="currentColor" strokeWidth="2" />
        <path d="M24 10v32M8 18l16 8 16-8" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "sales",
    title: "新規のご提案・営業の方",
    en: "Sales",
    hint: "資料ボックスへご案内します",
    accent: "from-[#c4a36a] to-[#8a6a32]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <path d="M14 10h16l8 8v20a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="2" />
        <path d="M30 10v8h8M18 26h12M18 32h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "other",
    title: "その他",
    en: "Other",
    hint: "会社名とお名前をご入力ください",
    accent: "from-[#718178] to-[#3e5147]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <path d="M10 12h28a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H23l-9 6v-6h-4a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="17" cy="25" r="1.7" fill="currentColor" />
        <circle cx="24" cy="25" r="1.7" fill="currentColor" />
        <circle cx="31" cy="25" r="1.7" fill="currentColor" />
      </svg>
    ),
  },
];

export function HomeScreen({ onSelect }: { onSelect: (id: HomeCard["id"]) => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="fade-up mt-6 mb-6 text-center">
        <h1 className="font-[family-name:var(--font-serif)] text-6xl font-medium tracking-[0.08em] text-[#15241c] lg:text-7xl">
          受付
        </h1>
        <p className="mt-3 text-lg font-medium text-[#4d5e55]">ご用件をお選びください</p>
      </div>
      <div className="fade-up-delay grid flex-1 grid-cols-6 gap-5 pb-2">
        {cards.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card.id)}
            className={`tile glass flex h-full min-h-[170px] flex-col items-start justify-between rounded-[1.8rem] p-6 text-left lg:p-7 ${
              index === 3
                ? "col-span-2 col-start-2"
                : index === 4
                  ? "col-span-2 col-start-4"
                  : "col-span-2"
            }`}
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}>
              {card.icon}
            </div>
            <div>
              <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">{card.en}</p>
              <p className="mt-1 text-2xl font-medium text-[#15241c] lg:text-[1.7rem]">{card.title}</p>
              <p className="mt-1 text-sm text-[#6b7a72]">{card.hint}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
