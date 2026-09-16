import type { DeliveryNeed, ReceptionPayload } from "./types";

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

  return `[toall]
[info][title]🏢 【来客】${name}様（担当：${staff}）[/title]
お客様がお見えです。

企業名：${company}
お名前：${name} 様
担当者：${staff}
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
  return payload.carrier ?? "";
}

function deliveryBody(payload: ReceptionPayload) {
  const need: DeliveryNeed = payload.deliveryNeed ?? "stamp_required";

  if (payload.carrier === "Nash") {
    return `[toall]
[info][title]🍱 【要対応】Nashが到着しました[/title]
Nashの配達業者様が到着されました。受領・対面対応をお願いします。
[hr]※冷凍品のため、受取後はすみやかに冷凍庫へ格納してください。[/info]`;
  }

  if (payload.carrier === "水の納品") {
    return `[toall]
[info][title]💧 【要対応】お水の納品が到着しました[/title]
ウォーターサーバー用のお水が届きました。受領・対面対応をお願いします。
[hr]※手運びでの受け取り対応をお願いします。（空ボトルの回収はありません）[/info]`;
  }

  const carrier = deliveryCarrierName(payload);

  if (need === "drop_off") {
    return `[toall]
[info][title]📦 【配送】置き配のご案内済み[/title]
配送業者様が置き配（受領印不要）を選択されました。
対面対応は不要です。荷物の到着をご確認ください。

業者名：${carrier}
要件：置き配・受領印不要[/info]`;
  }

  return `[toall]
[info][title]📦 【配送】受領印のお願い[/title]
配送業者様がいらっしゃいました。エントランスでのご対応をお願いします。

業者名：${carrier}
要件：受領印が必要[/info]`;
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
