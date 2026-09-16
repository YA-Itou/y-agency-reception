"use client";

import { BackButton, Field, PrimaryButton, ScreenCard } from "./ui";

export function AppointmentScreen({
  companyName,
  visitorName,
  staffName,
  submitting,
  onChange,
  onBack,
  onSubmit,
}: {
  companyName: string;
  visitorName: string;
  staffName: string;
  submitting: boolean;
  onChange: (field: "companyName" | "visitorName" | "staffName", value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const canSubmit = companyName.trim().length > 0 && visitorName.trim().length > 0;

  return (
    <ScreenCard className="mx-auto mt-6 w-full max-w-4xl">
      <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">APPOINTMENT</p>
      <h2 className="mt-2 text-[2rem] font-medium leading-snug text-[#15241c]">お約束のある方</h2>
      <p className="mt-4 rounded-2xl bg-[#184a34]/6 px-4 py-3 text-sm leading-relaxed text-[#3f5348]">
        ※事前の約束がない営業・ご提案の方はトップに戻り『新規のご提案・営業の方』をお選びください
      </p>
      <form
        className="mt-6 grid grid-cols-2 gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit && !submitting) onSubmit();
        }}
      >
        <Field
          label="貴社名"
          required
          value={companyName}
          onChange={(value) => onChange("companyName", value)}
          placeholder="株式会社〇〇"
          autoComplete="organization"
        />
        <Field
          label="お名前"
          required
          value={visitorName}
          onChange={(value) => onChange("visitorName", value)}
          placeholder="山田 太郎"
          autoComplete="name"
        />
        <div className="col-span-2">
          <Field
            label="訪問予定の担当者名"
            value={staffName}
            onChange={(value) => onChange("staffName", value)}
            placeholder="未入力の場合は「未指定」として通知します"
          />
        </div>
        <div className="col-span-2 mt-2 flex items-center justify-between">
          <BackButton onClick={onBack} disabled={submitting} />
          <PrimaryButton type="submit" disabled={!canSubmit || submitting}>
            {submitting ? "送信中…" : "受付する"}
          </PrimaryButton>
        </div>
      </form>
    </ScreenCard>
  );
}

export function InterviewScreen({
  visitorName,
  submitting,
  onChange,
  onBack,
  onSubmit,
}: {
  visitorName: string;
  submitting: boolean;
  onChange: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const canSubmit = visitorName.trim().length > 0;

  return (
    <ScreenCard className="mx-auto mt-6 w-full max-w-3xl">
      <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">INTERVIEW</p>
      <h2 className="mt-2 text-[2rem] font-medium leading-snug text-[#15241c]">採用・面接の方</h2>
      <form
        className="mt-8 space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit && !submitting) onSubmit();
        }}
      >
        <Field
          label="お名前（フルネーム）"
          required
          value={visitorName}
          onChange={onChange}
          placeholder="鈴木 花子"
          autoComplete="name"
        />
        <div className="flex items-center justify-between">
          <BackButton onClick={onBack} disabled={submitting} />
          <PrimaryButton type="submit" disabled={!canSubmit || submitting}>
            {submitting ? "送信中…" : "受付する"}
          </PrimaryButton>
        </div>
      </form>
    </ScreenCard>
  );
}

export function OtherReceptionScreen({
  companyName,
  visitorName,
  submitting,
  onChange,
  onBack,
  onSubmit,
}: {
  companyName: string;
  visitorName: string;
  submitting: boolean;
  onChange: (field: "companyName" | "visitorName", value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const canSubmit = companyName.trim().length > 0 && visitorName.trim().length > 0;

  return (
    <ScreenCard className="mx-auto mt-6 w-full max-w-4xl">
      <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">OTHER</p>
      <h2 className="mt-2 text-[2rem] font-medium leading-snug text-[#15241c]">その他のご用件</h2>
      <p className="mt-3 text-sm text-[#6b7a72]">会社名とお名前をご入力ください</p>
      <form
        className="mt-8 grid grid-cols-2 gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit && !submitting) onSubmit();
        }}
      >
        <Field
          label="会社名"
          required
          value={companyName}
          onChange={(value) => onChange("companyName", value)}
          placeholder="株式会社〇〇"
          autoComplete="organization"
        />
        <Field
          label="お名前"
          required
          value={visitorName}
          onChange={(value) => onChange("visitorName", value)}
          placeholder="山田 太郎"
          autoComplete="name"
        />
        <div className="col-span-2 mt-2 flex items-center justify-between">
          <BackButton onClick={onBack} disabled={submitting} />
          <PrimaryButton type="submit" disabled={!canSubmit || submitting}>
            {submitting ? "送信中…" : "受付する"}
          </PrimaryButton>
        </div>
      </form>
    </ScreenCard>
  );
}
