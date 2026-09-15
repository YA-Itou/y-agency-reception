import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { HistoryApp } from "@/components/admin/HistoryApp";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <HistoryApp />;
}
