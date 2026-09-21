"use client";

import { BackButton, PrimaryButton, ScreenCard } from "./ui";

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
          誠にお手数ですが、ご持参いただきましたお名刺や資料等は
          <br />
          タブレット横の
          <span className="font-medium text-[#184a34]">『名刺・資料投入ボックス』</span>
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
