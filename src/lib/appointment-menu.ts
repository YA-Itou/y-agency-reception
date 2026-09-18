export type AppointmentFormKind = "interview" | "appointment";

export type AppointmentMenuItem = {
  id: string;
  label: string;
  en: string;
  hint: string;
  form: AppointmentFormKind;
  accent: string;
  draft?: boolean;
};

/**
 * 約束ありの子メニュー。
 * 人事ヒアリング後は、この配列に1件足すだけで画面に増える。
 */
export const APPOINTMENT_MENUS: AppointmentMenuItem[] = [
  {
    id: "interview",
    label: "面接・面談の方",
    en: "Interview",
    hint: "担当者をご案内します",
    form: "interview",
    accent: "from-[#2a9b8f] to-[#14635c]",
  },
  {
    id: "meeting",
    label: "お打ち合わせ",
    en: "Meeting",
    hint: "担当者をご案内します",
    form: "appointment",
    accent: "from-[#1f7a4c] to-[#143d2e]",
  },
  {
    id: "other-appt",
    label: "その他",
    en: "Other",
    hint: "担当者をご案内します",
    form: "appointment",
    accent: "from-[#718178] to-[#3e5147]",
  },
];

export function getAppointmentMenu(id: string) {
  return APPOINTMENT_MENUS.find((item) => item.id === id);
}
