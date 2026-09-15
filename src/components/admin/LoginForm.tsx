"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!response.ok) {
      setError("パスワードが正しくありません");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-[2rem] px-8 py-10">
      <Image src="/logo.png" alt="株式会社 Y Agency" width={220} height={56} unoptimized className="h-10 w-auto" />
      <p className="mt-8 text-[11px] tracking-[0.16em] text-[#c4a36a]">STAFF ONLY</p>
      <h1 className="mt-1 text-4xl font-medium text-[#15241c]">受付履歴</h1>
      <p className="mt-2 text-sm text-[#6b7a72]">社内スタッフ向けの閲覧画面です</p>
      <label className="mt-8 block">
        <span className="mb-2 block text-sm font-medium text-[#184a34]">パスワード</span>
        <input
          type="password"
          className="field"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
      </label>
      {error ? <p className="mt-3 text-sm text-[#b42318]">{error}</p> : null}
      <button type="submit" disabled={loading || !password} className="primary-btn mt-6 w-full rounded-full py-3.5 font-medium">
        {loading ? "確認中…" : "ログイン"}
      </button>
    </form>
  );
}
