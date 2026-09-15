import { NextResponse } from "next/server";
import { buildChatworkBody, sendChatworkMessage } from "@/lib/chatwork";
import { insertReceptionLog } from "@/lib/supabase";
import type { ReceptionPayload } from "@/lib/types";

function isPayload(value: unknown): value is ReceptionPayload {
  if (!value || typeof value !== "object") return false;
  const visitType = (value as ReceptionPayload).visitType;
  return (
    visitType === "appointment" ||
    visitType === "interview" ||
    visitType === "delivery" ||
    visitType === "sales"
  );
}

function validate(payload: ReceptionPayload): string | null {
  if (payload.visitType === "appointment") {
    if (!payload.companyName?.trim() || !payload.visitorName?.trim()) {
      return "貴社名とお名前は必須です";
    }
  }
  if (payload.visitType === "interview") {
    if (!payload.visitorName?.trim()) return "お名前は必須です";
  }
  if (payload.visitType === "delivery") {
    if (!payload.carrier) return "業者を選択してください";
    if (!payload.deliveryNeed) return "要件を選択してください";
    if (payload.carrier === "その他" && !payload.companyName?.trim()) {
      return "社名は必須です";
    }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    if (!isPayload(json)) {
      return NextResponse.json({ ok: false, error: "不正なリクエストです" }, { status: 400 });
    }

    const invalid = validate(json);
    if (invalid) {
      return NextResponse.json({ ok: false, error: invalid }, { status: 400 });
    }

    const body = buildChatworkBody(json);
    const result = await sendChatworkMessage(body);

    await insertReceptionLog({
      payload: json,
      chatworkStatus: result.ok ? "sent" : "failed",
      chatworkMessageId: result.messageId,
      errorMessage: result.error,
    });

    return NextResponse.json({ ok: true, notified: result.ok });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "送信に失敗しました" }, { status: 500 });
  }
}
