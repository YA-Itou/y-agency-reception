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
  return (
    <main className="flex flex-1 items-center py-4">
      <div className="mx-auto w-full max-w-5xl">
        <ScreenCard className="w-full">
          <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">APPOINTMENT</p>
          <h2 className="mt-2 text-[2rem] font-medium leading-snug text-[#15241c]">ご用件をお選びください</h2>
          <p className="mt-2 text-sm text-[#6b7a72]">お約束の内容に近い項目をタップしてください</p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {APPOINTMENT_MENUS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                className="tile glass w-full rounded-[1.6rem] p-6 text-left align-top"
              >
                <span className="flex flex-col items-start gap-5">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-md`}
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
                  </span>
                  <span className="block">
                    <span className="block text-[13px] tracking-[0.16em] text-[#c4a36a]">{item.en}</span>
                    <span className="mt-2 block whitespace-nowrap font-[family-name:var(--font-serif)] text-[1.75rem] font-medium leading-snug tracking-[0.03em] text-[#15241c]">
                      {item.label}
                    </span>
                    <span className="mt-2 block text-base text-[#5b6c63]">{item.hint}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </ScreenCard>
        <div className="mt-4">
          <BackButton onClick={onBack} />
        </div>
      </div>
    </main>
  );
}
