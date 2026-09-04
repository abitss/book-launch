import { redirect } from "next/navigation";
import AdminConsole from "@/components/AdminConsole";
import { isAdmin } from "@/lib/admin-auth";
import { adminListCatalog } from "@/lib/catalog";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const catalog = await adminListCatalog();
  return <AdminConsole initial={catalog} />;
}
