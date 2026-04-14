import React from "react";
import styles from "./MainLayout.module.scss";
import { cn } from "@/components/ui/utils";

/**
 * Layout chính của hệ thống - Phiên bản không có Sidebar.
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("flex min-h-screen", styles.layoutContainer)}>
      {/* Vùng nội dung chính */}
      <main className={cn("flex-1 overflow-auto relative z-10", styles.mainContent)}>
        {children}
      </main>
    </div>
  );
}
