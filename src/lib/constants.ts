import type { CarrierId } from "./types";

export const IDLE_MS = 15_000;

export const CARRIERS: {
  id: CarrierId;
  label: string;
  skipNeed: boolean;
}[] = [
  { id: "amazon", label: "Amazon", skipNeed: false },
  { id: "yamato", label: "ヤマト運輸", skipNeed: false },
  { id: "sagawa", label: "佐川急便", skipNeed: false },
  { id: "japanpost", label: "日本郵便", skipNeed: false },
  { id: "nash", label: "Nash", skipNeed: true },
  { id: "water", label: "水の納品", skipNeed: true },
  { id: "other", label: "その他", skipNeed: false },
];

export const CARRIER_LABEL: Record<CarrierId, string> = {
  amazon: "Amazon",
  yamato: "ヤマト運輸",
  sagawa: "佐川急便",
  japanpost: "日本郵便",
  nash: "Nash",
  water: "水の納品",
  other: "その他",
};

export const VISIT_TYPE_LABEL = {
  appointment: "お約束",
  interview: "面接",
  delivery: "配送",
  sales: "営業",
  other: "その他",
} as const;

export const COMPLETE_MESSAGE = {
  appointment: "担当者に通知しました。\n少々お待ちください。",
  interview: "採用担当に通知しました。\n少々お待ちください。",
  "delivery-call": "担当者を呼び出しました。\n少々お待ちください。",
  "delivery-dropoff":
    "ご案内ありがとうございました。\n荷物は所定の場所へお置きください。",
  other: "受付内容を通知しました。\n少々お待ちください。",
} as const;
