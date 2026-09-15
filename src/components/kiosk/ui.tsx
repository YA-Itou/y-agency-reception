"use client";

import type { ReactNode } from "react";

export function KioskFrame({ children }: { children: ReactNode }) {
  return (
    <div className="kiosk-root">
      <div className="atmosphere" />
      <div className="relative z-10 flex min-h-dvh flex-col px-8 py-6 lg:px-12">{children}</div>
      <PortraitHint />
    </div>
  );
}

function PortraitHint() {
  return (
      <div className="portrait-lock pointer-events-none fixed inset-0 z-50 hidden items-center justify-center bg-[#15241c]/88 px-10 text-center text-[#f7f4ec]" aria-hidden="true">
      <div>
        <p className="text-4xl font-medium">横向きにしてください</p>
        <p className="mt-3 text-sm tracking-wide opacity-75">この受付画面はタブレットの横置き表示を前提としています</p>
      </div>
    </div>
  );
}

export function BackButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-[#184a34]/15 bg-white/50 px-5 py-3 text-sm font-medium text-[#184a34] backdrop-blur-sm transition hover:bg-white disabled:opacity-40"
    >
      戻る
    </button>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="primary-btn min-w-48 rounded-full px-8 py-3.5 text-base font-medium"
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline gap-2 text-sm font-medium text-[#184a34]">
        {label}
        {required ? (
          <span className="rounded-full bg-[#184a34] px-2 py-0.5 text-[10px] tracking-widest text-[#f7f4ec]">
            必須
          </span>
        ) : (
          <span className="text-[10px] tracking-widest text-[#8a948e]">任意</span>
        )}
      </span>
      <input
        className="field text-lg"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete ?? "off"}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </label>
  );
}

export function ScreenCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`glass fade-up rounded-[2rem] p-8 lg:p-10 ${className}`}>{children}</section>;
}
