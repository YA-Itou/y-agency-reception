"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { VISIT_TYPE_LABEL } from "@/lib/constants";
import type { ReceptionLog, VisitType } from "@/lib/types";

function todayJst() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function dash(value: string | null | undefined) {
  return value?.trim() ? value : "—";
}

function deliveryLabel(row: ReceptionLog) {
  if (row.visit_type !== "delivery") return "—";
  const need =
    row.delivery_need === "drop_off"
      ? "置き配"
      : row.delivery_need === "must_receive"
        ? "受取必須"
        : "受領印";
  const carrier =
    row.carrier === "その他" && row.company_name?.trim()
      ? `その他（${row.company_name}）`
      : (row.carrier ?? "—");
  return `${carrier} / ${need}`;
}

export function HistoryApp() {
  const router = useRouter();
  const initial = todayJst();
  const [from, setFrom] = useState(initial);
  const [to, setTo] = useState(initial);
  const [visitType, setVisitType] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<ReceptionLog[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  const pageCount = Math.max(1, Math.ceil(total / 50));

  const query = useMemo(() => {
    const params = new URLSearchParams({ from, to, visitType, status, page: String(page) });
    return `/api/admin/logs?${params.toString()}`;
  }, [from, to, visitType, status, page]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const response = await fetch(query);
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    const json = (await response.json()) as {
      ok: boolean;
      rows?: ReceptionLog[];
      total?: number;
      error?: string;
    };
    setLoading(false);
    if (!json.ok) {
      setError(json.error || "取得に失敗しました");
      return;
    }
    setRows(json.rows ?? []);
    setTotal(json.total ?? 0);
  }, [query, router]);

  useEffect(() => {
    void load();
  }, [load]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell px-6 py-6 lg:px-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="株式会社 Y Agency" width={180} height={46} unoptimized className="h-9 w-auto" />
          <div>
            <p className="text-[11px] tracking-[0.16em] text-[#c4a36a]">RECEPTION LOGS</p>
            <h1 className="text-3xl font-medium text-[#15241c]">受付履歴</h1>
          </div>
        </div>
        <button
          type="button"
          onClick={() => void logout()}
          className="rounded-full border border-[#184a34]/15 bg-white/70 px-5 py-2 text-sm text-[#184a34]"
        >
          ログアウト
        </button>
      </header>

      <section className="glass mb-5 grid grid-cols-2 gap-3 rounded-3xl p-4 md:grid-cols-5">
        <label className="text-xs text-[#6b7a72]">
          開始日
          <input
            type="date"
            className="field mt-1 py-2 text-sm"
            value={from}
            onChange={(event) => {
              setPage(1);
              setFrom(event.target.value);
            }}
          />
        </label>
        <label className="text-xs text-[#6b7a72]">
          終了日
          <input
            type="date"
            className="field mt-1 py-2 text-sm"
            value={to}
            onChange={(event) => {
              setPage(1);
              setTo(event.target.value);
            }}
          />
        </label>
        <label className="text-xs text-[#6b7a72]">
          種別
          <select
            className="field mt-1 py-2 text-sm"
            value={visitType}
            onChange={(event) => {
              setPage(1);
              setVisitType(event.target.value);
            }}
          >
            <option value="all">すべて</option>
            <option value="appointment">お約束</option>
            <option value="interview">面接</option>
            <option value="delivery">配送</option>
            <option value="sales">営業</option>
          </select>
        </label>
        <label className="text-xs text-[#6b7a72]">
          通知
          <select
            className="field mt-1 py-2 text-sm"
            value={status}
            onChange={(event) => {
              setPage(1);
              setStatus(event.target.value);
            }}
          >
            <option value="all">すべて</option>
            <option value="sent">成功</option>
            <option value="failed">失敗</option>
          </select>
        </label>
        <div className="flex items-end text-sm text-[#6b7a72]">{loading ? "読み込み中…" : `${total} 件`}</div>
      </section>

      {error ? (
        <p className="mb-4 rounded-2xl bg-[#b42318]/10 px-4 py-3 text-sm text-[#b42318]">{error}</p>
      ) : null}

      <div className="glass overflow-hidden rounded-3xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#184a34] text-[11px] tracking-[0.16em] text-[#f7f4ec]">
            <tr>
              <th className="px-4 py-3 font-medium">日時</th>
              <th className="px-4 py-3 font-medium">種別</th>
              <th className="px-4 py-3 font-medium">会社名</th>
              <th className="px-4 py-3 font-medium">お名前</th>
              <th className="px-4 py-3 font-medium">担当者</th>
              <th className="px-4 py-3 font-medium">業者・要件</th>
              <th className="px-4 py-3 font-medium">通知</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center text-[#8a948e]">
                  この条件の受付履歴はありません
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={`cursor-pointer border-t border-[#184a34]/8 ${
                    row.chatwork_status === "failed" ? "bg-[#b42318]/8" : "bg-white/40"
                  }`}
                  onClick={() => setOpenId(openId === row.id ? null : row.id)}
                >
                  <td className="px-4 py-3 whitespace-nowrap">{formatDateTime(row.created_at)}</td>
                  <td className="px-4 py-3">{VISIT_TYPE_LABEL[row.visit_type as VisitType]}</td>
                  <td className="px-4 py-3">{dash(row.company_name)}</td>
                  <td className="px-4 py-3">{dash(row.visitor_name)}</td>
                  <td className="px-4 py-3">
                    {row.visit_type === "appointment"
                      ? row.staff_name?.trim()
                        ? row.staff_name
                        : "未指定"
                      : "—"}
                  </td>
                  <td className="px-4 py-3">{deliveryLabel(row)}</td>
                  <td className="px-4 py-3">
                    {row.chatwork_status === "sent" ? (
                      <span className="rounded-full bg-[#184a34]/10 px-2 py-1 text-[#184a34]">成功</span>
                    ) : (
                      <span className="rounded-full bg-[#b42318]/12 px-2 py-1 text-[#b42318]">失敗</span>
                    )}
                    {openId === row.id && row.error_message ? (
                      <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#6b7a72]">{row.error_message}</p>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-[#4d5e55]">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((value) => value - 1)}
          className="rounded-full border border-[#184a34]/15 px-4 py-2 disabled:opacity-40"
        >
          前へ
        </button>
        <p>
          {page} / {pageCount}
        </p>
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => setPage((value) => value + 1)}
          className="rounded-full border border-[#184a34]/15 px-4 py-2 disabled:opacity-40"
        >
          次へ
        </button>
      </div>
    </div>
  );
}
