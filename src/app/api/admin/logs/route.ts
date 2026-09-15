import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { listReceptionLogs } from "@/lib/supabase";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  const from = searchParams.get("from") || today;
  const to = searchParams.get("to") || today;
  const visitType = searchParams.get("visitType") || "all";
  const chatworkStatus = searchParams.get("status") || "all";
  const page = Math.max(1, Number(searchParams.get("page") || "1"));

  try {
    const result = await listReceptionLogs({
      from,
      to,
      visitType,
      chatworkStatus,
      page,
      pageSize: 50,
    });
    return NextResponse.json({ ok: true, ...result, page, pageSize: 50 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "取得に失敗しました" },
      { status: 500 },
    );
  }
}
