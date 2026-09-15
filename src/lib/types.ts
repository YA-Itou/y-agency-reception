export type VisitType = "appointment" | "interview" | "delivery" | "sales";

export type DeliveryNeed = "stamp_required" | "drop_off" | "must_receive";

export type CarrierId =
  | "amazon"
  | "yamato"
  | "sagawa"
  | "japanpost"
  | "nash"
  | "water"
  | "other";

export type ChatworkStatus = "sent" | "failed";

export type KioskStep =
  | "welcome"
  | "home"
  | "appointment"
  | "interview"
  | "delivery-carriers"
  | "delivery-other"
  | "delivery-need"
  | "sales"
  | "complete";

export type CompleteKind =
  | "appointment"
  | "interview"
  | "delivery-call"
  | "delivery-dropoff";

export type ReceptionPayload = {
  visitType: VisitType;
  companyName?: string;
  visitorName?: string;
  staffName?: string;
  carrier?: string;
  deliveryNeed?: DeliveryNeed;
};

export type ReceptionLog = {
  id: string;
  created_at: string;
  visit_type: VisitType;
  company_name: string | null;
  visitor_name: string | null;
  staff_name: string | null;
  carrier: string | null;
  delivery_need: DeliveryNeed | null;
  chatwork_status: ChatworkStatus;
  chatwork_message_id: string | null;
  error_message: string | null;
};
