"use client";

import { CARRIERS } from "@/lib/constants";
import type { CarrierId } from "@/lib/types";
import { BackButton, Field, PrimaryButton, ScreenCard } from "./ui";

export function CarrierScreen({
  onBack,
  onSelect,
}: {
  onBack: () => void;
  onSelect: (id: CarrierId) => void;
}) {
  return (
    <ScreenCard className="mx-auto mt-6 w-full max-w-5xl">
      <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">DELIVERY</p>
      <h2 className="mt-2 text-[2rem] font-medium leading-snug text-[#15241c]">業者を選択してください</h2>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {CARRIERS.slice(0, 4).map((carrier) => (
          <button
            key={carrier.id}
            type="button"
            onClick={() => onSelect(carrier.id)}
            className="tile glass rounded-3xl px-4 py-8 text-xl font-medium text-[#15241c]"
          >
            {carrier.label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {CARRIERS.slice(4).map((carrier) => (
          <button
            key={carrier.id}
            type="button"
            onClick={() => onSelect(carrier.id)}
            className="tile glass rounded-3xl px-4 py-8 text-xl font-medium text-[#15241c]"
          >
            {carrier.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <BackButton onClick={onBack} />
      </div>
    </ScreenCard>
  );
}

export function OtherCarrierScreen({
  companyName,
  submitting,
  onChange,
  onBack,
  onSubmit,
}: {
  companyName: string;
  submitting: boolean;
  onChange: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const canSubmit = companyName.trim().length > 0;

  return (
    <ScreenCard className="mx-auto mt-6 w-full max-w-3xl">
      <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">OTHER</p>
      <h2 className="mt-2 text-[2rem] font-medium leading-snug text-[#15241c]">社名を入力してください</h2>
      <form
        className="mt-8 space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit && !submitting) onSubmit();
        }}
      >
        <Field
          label="社名"
          required
          value={companyName}
          onChange={onChange}
          placeholder="株式会社〇〇"
          autoComplete="organization"
        />
        <div className="flex items-center justify-between">
          <BackButton onClick={onBack} disabled={submitting} />
          <PrimaryButton type="submit" disabled={!canSubmit || submitting}>
            次へ
          </PrimaryButton>
        </div>
      </form>
    </ScreenCard>
  );
}

export function DeliveryNeedScreen({
  carrierLabel,
  submitting,
  onBack,
  onSelect,
}: {
  carrierLabel: string;
  submitting: boolean;
  onBack: () => void;
  onSelect: (need: "stamp_required" | "drop_off") => void;
}) {
  return (
    <ScreenCard className="mx-auto mt-6 w-full max-w-4xl">
      <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">{carrierLabel}</p>
      <h2 className="mt-2 text-[2rem] font-medium leading-snug text-[#15241c]">ご要件を選択してください</h2>
      <div className="mt-8 grid grid-cols-2 gap-5">
        <button
          type="button"
          disabled={submitting}
          onClick={() => onSelect("stamp_required")}
          className="tile glass rounded-[1.8rem] px-6 py-12 text-left"
        >
          <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">CALL STAFF</p>
          <p className="mt-2 text-2xl font-medium">受領印が必要（呼び出し）</p>
          <p className="mt-2 text-sm text-[#6b7a72]">担当者がエントランスへ伺います</p>
        </button>
        <button
          type="button"
          disabled={submitting}
          onClick={() => onSelect("drop_off")}
          className="tile glass rounded-[1.8rem] px-6 py-12 text-left"
        >
          <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">DROP OFF</p>
          <p className="mt-2 text-2xl font-medium">置き配・受領印不要</p>
          <p className="mt-2 text-sm text-[#6b7a72]">対面対応はいたしません</p>
        </button>
      </div>
      <div className="mt-6">
        <BackButton onClick={onBack} disabled={submitting} />
      </div>
    </ScreenCard>
  );
}

export function SalesScreen({
  submitting,
  onConfirm,
  onBack,
}: {
  submitting: boolean;
  onConfirm: () => void;
  onBack?: () => void;
}) {
  return (
    <ScreenCard className="mx-auto mt-4 w-full max-w-4xl">
      <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">SALES VISIT</p>
      <h2 className="mt-2 text-[2rem] font-medium leading-snug text-[#15241c]">ご来訪誠にありがとうございます。</h2>
      <div className="mt-6 space-y-4 text-lg leading-loose text-[#2b3b33]">
        <p>現在、事前の予約がないご提案・営業等のご面会はお断りしております。</p>
        <p>
          誠にお手数ですが、ご持参いただきましたお名刺や資料等は、
          <span className="mx-1 font-medium text-[#184a34]">タブレット横の『名刺・資料投入ボックス』</span>
          へお入れください。
        </p>
        <p>担当部署にて確認の上、必要な場合のみご連絡いたします。</p>
      </div>
      <div className={`mt-10 flex ${onBack ? "items-center justify-between" : "justify-center"}`}>
        {onBack ? <BackButton onClick={onBack} disabled={submitting} /> : null}
        <button
          type="button"
          disabled={submitting}
          onClick={onConfirm}
          className="primary-btn rounded-full px-10 py-4 text-base font-medium"
        >
          {submitting ? "送信中…" : "確認してトップへ戻る"}
        </button>
      </div>
    </ScreenCard>
  );
}

export function CompleteScreen({ message, onHome }: { message: string; onHome: () => void }) {
  return (
    <div className="fade-up flex flex-1 flex-col items-center justify-center text-center">
      <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
        <span className="pulse-ring absolute inset-0 rounded-full border border-[#1f7a4c]/35" />
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#2a8a58] to-[#184a34] text-3xl text-white shadow-xl">
          ✓
        </span>
      </div>
      <p className="max-w-3xl whitespace-pre-line text-4xl font-medium leading-relaxed text-[#15241c] lg:text-5xl">
        {message}
      </p>
      <div className="mt-8">
        <PrimaryButton onClick={onHome}>トップへ戻る</PrimaryButton>
      </div>
      <p className="mt-5 text-sm text-[#8a948e]">まもなくトップ画面に戻ります</p>
    </div>
  );
}
