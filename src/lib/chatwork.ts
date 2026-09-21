import type { ReceptionPayload } from "./types";

function staffName(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "未指定";
}

export function buildChatworkBody(payload: ReceptionPayload): string {
  switch (payload.visitType) {
    case "appointment":
      return appointmentBody(payload);
    case "interview":
      return interviewBody(payload);
    case "delivery":
      return deliveryBody(payload);
    case "sales":
      return salesBody();
    case "other":
      return otherBody(payload);
  }
}

function appointmentBody(payload: ReceptionPayload) {
  const name = payload.visitorName?.trim() ?? "";
  const company = payload.companyName?.trim() ?? "";
  const staff = staffName(payload.staffName);
  const purpose = payload.appointmentPurpose?.trim();
  const details = [
    `企業名：${company}`,
    `お名前：${name} 様`,
    purpose ? `ご用件：${purpose}` : null,
    `担当者：${staff}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `[toall]
[info][title]🏢 【来客】${name}様（担当：${staff}）[/title]
お客様がお見えです。

${details}
[hr]※担当者が未指定の場合は、お近くのスタッフがご対応をお願いします。[/info]`;
}

function interviewBody(payload: ReceptionPayload) {
  const name = payload.visitorName?.trim() ?? "";

  return `[toall]
[info][title]👔 【面接】採用担当者様[/title]
面接の方が到着されました。ご対応をお願いします。

お名前：${name} 様[/info]`;
}

function deliveryCarrierName(payload: ReceptionPayload) {
  if (payload.carrier === "その他") {
    return payload.companyName?.trim() || "その他";
  }
  return payload.carrier?.trim() ?? "";
}

function deliveryBody(payload: ReceptionPayload) {
  const carrier = deliveryCarrierName(payload);
  const carrierLine = carrier ? `\n\n業者名：${carrier}` : "";

  return `[toall]
[info][title]📦 【配送・集荷】担当者呼び出し[/title]
配送・集荷の方が到着。担当者を呼び出してください${carrierLine}[/info]`;
}

function salesBody() {
  return `[toall]
[info][title]📄 【営業来訪】資料投入のご案内済み[/title]
新規のご提案・営業の方が来訪されました。
受付画面にて名刺・資料投入ボックスへの投函をご案内しています。
[hr]※対面対応は不要です。後ほど受付ボックスをご確認ください。[/info]`;
}

function otherBody(payload: ReceptionPayload) {
  const company = payload.companyName?.trim() ?? "";
  const name = payload.visitorName?.trim() ?? "";

  return `[toall]
[info][title]🔔 【その他】来訪者のお知らせ[/title]
その他のご用件でお客様がお見えです。ご対応をお願いします。

会社名：${company}
お名前：${name} 様[/info]`;
}

export async function sendChatworkMessage(body: string): Promise<{
  ok: boolean;
  messageId?: string;
  error?: string;
}> {
  const token = process.env.CHATWORK_API_TOKEN;
  const roomId = process.env.CHATWORK_ROOM_ID;

  if (!token || !roomId) {
    return { ok: false, error: "Chatwork の環境変数が未設定です" };
  }

  const request = async () => {
    const response = await fetch(
      `https://api.chatwork.com/v2/rooms/${roomId}/messages`,
      {
        method: "POST",
        headers: {
          "X-ChatWorkToken": token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ body }),
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Chatwork API ${response.status}: ${text.slice(0, 200)}`);
    }

    const json = (await response.json()) as { message_id?: string | number };
    return String(json.message_id ?? "");
  };

  try {
    const messageId = await request();
    return { ok: true, messageId };
  } catch (firstError) {
    try {
      const messageId = await request();
      return { ok: true, messageId };
    } catch (secondError) {
      const error =
        secondError instanceof Error
          ? secondError.message
          : firstError instanceof Error
            ? firstError.message
            : "Chatwork 送信に失敗しました";
      return { ok: false, error };
    }
  }
}
