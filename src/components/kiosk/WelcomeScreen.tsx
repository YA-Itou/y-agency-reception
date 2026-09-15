"use client";

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="fade-up flex flex-1 flex-col items-center justify-center pb-8 text-center">
      <h1 className="max-w-4xl text-5xl font-medium leading-relaxed text-[#15241c] lg:text-6xl">
        ご訪問ありがとうございます。
      </h1>
      <p className="mt-5 text-lg text-[#6b7a72]">受付を始める方は、下のボタンをタップしてください</p>
      <button
        type="button"
        onClick={onStart}
        className="primary-btn mt-12 min-w-[280px] rounded-full px-12 py-5 text-xl font-medium"
      >
        受付を開始する
      </button>
    </div>
  );
}
