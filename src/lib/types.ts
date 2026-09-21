export type VisitType = "appointment" | "interview" | "delivery" | "sales" | "other";

export type DeliveryNeed = "stamp_required" | "drop_off" | "must_receive";

export type ChatworkStatus = "sent" | "failed";

export type KioskStep =
  | "welcome"
  | "home"
  | "appointment-menu"
  | "appointment-form"
  | "no-appointment"
  | "complete";

export type ReceptionPayload = {
  visitType: VisitType;
  companyName?: string;
  visitorName?: string;
  staffName?: string;
  appointmentPurpose?: string;
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
