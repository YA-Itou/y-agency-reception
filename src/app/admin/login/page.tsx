import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="admin-shell flex min-h-dvh items-center justify-center px-6">
      <LoginForm />
    </div>
  );
}
