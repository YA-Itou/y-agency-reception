"use client";

import { APPOINTMENT_MENUS, type AppointmentMenuItem } from "@/lib/appointment-menu";
import { BackButton, ScreenCard } from "./ui";

export function AppointmentMenuScreen({
  onBack,
  onSelect,
}: {
  onBack: () => void;
  onSelect: (item: AppointmentMenuItem) => void;
}) {
  const columns = APPOINTMENT_MENUS.length <= 3 ? APPOINTMENT_MENUS.length : 2;

  return (
    <div className="flex flex-1 flex-col">
      <ScreenCard className="mx-auto mt-6 flex w-full max-w-5xl flex-1 flex-col">
        <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">APPOINTMENT</p>
        <h2 className="mt-2 text-[2rem] font-medium leading-snug text-[#15241c]">ご用件をお選びください</h2>
        <p className="mt-2 text-sm text-[#6b7a72]">お約束の内容に近い項目をタップしてください</p>
        <div className={`mt-8 grid flex-1 gap-4 ${columns === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {APPOINTMENT_MENUS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className="tile glass flex h-full min-h-[140px] flex-col items-start justify-center gap-6 rounded-[1.6rem] p-6 text-left"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-md`}
              >
                <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none" aria-hidden>
                  <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M10 38c2.4-7 8-11 14-11s11.6 4 14 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[13px] tracking-[0.16em] text-[#c4a36a]">{item.en}</p>
                <p className="mt-2 font-[family-name:var(--font-serif)] text-[1.85rem] font-medium leading-snug tracking-[0.04em] text-[#15241c]">
                  {item.label}
                </p>
                <p className="mt-2 text-base text-[#5b6c63]">{item.hint}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6">
          <BackButton onClick={onBack} />
        </div>
      </ScreenCard>
    </div>
  );
}
