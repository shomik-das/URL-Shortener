// "use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { DashboardHeader } from "@/components/ui/dashboard-header";
import { AdminSidebar } from "@/components/dashboard/admin-sidebar";
// import { useSelectedLayoutSegment } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function Layout({children,}: Readonly<{children: React.ReactNode;}>) {
//   const selectedLayoutSegment = useSelectedLayoutSegment();

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        {/* {selectedLayoutSegment !== "messages" && <DashboardHeader />} */}
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
