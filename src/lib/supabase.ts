import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ChatworkStatus, ReceptionPayload } from "./types";

function getClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function insertReceptionLog(input: {
  payload: ReceptionPayload;
  chatworkStatus: ChatworkStatus;
  chatworkMessageId?: string;
  errorMessage?: string;
}) {
  const supabase = getClient();
  if (!supabase) {
    throw new Error("Supabase の環境変数が未設定です");
  }

  const { error } = await supabase.from("reception_logs").insert({
    visit_type: input.payload.visitType,
    company_name: input.payload.companyName?.trim() || null,
    visitor_name: input.payload.visitorName?.trim() || null,
    staff_name: input.payload.staffName?.trim() || null,
    carrier: input.payload.carrier || null,
    delivery_need: input.payload.deliveryNeed || null,
    chatwork_status: input.chatworkStatus,
    chatwork_message_id: input.chatworkMessageId || null,
    error_message: input.errorMessage || null,
  });

  if (error) {
    throw new Error(`reception_logs insert failed: ${error.message}`);
  }
}

export async function listReceptionLogs(params: {
  from: string;
  to: string;
  visitType?: string;
  chatworkStatus?: string;
  page: number;
  pageSize: number;
}) {
  const supabase = getClient();
  if (!supabase) {
    throw new Error("Supabase の環境変数が未設定です");
  }

  const fromDate = new Date(`${params.from}T00:00:00+09:00`);
  const toDate = new Date(`${params.to}T23:59:59.999+09:00`);
  const from = (params.page - 1) * params.pageSize;
  const to = from + params.pageSize - 1;

  let query = supabase
    .from("reception_logs")
    .select("*", { count: "exact" })
    .gte("created_at", fromDate.toISOString())
    .lte("created_at", toDate.toISOString())
    .order("created_at", { ascending: false })
    .range(from, to);

  if (params.visitType && params.visitType !== "all") {
    query = query.eq("visit_type", params.visitType);
  }
  if (params.chatworkStatus && params.chatworkStatus !== "all") {
    query = query.eq("chatwork_status", params.chatworkStatus);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  return { rows: data ?? [], total: count ?? 0 };
}
