import "../../index.css";
import {
  SidebarProvider,
  SidebarInset,
} from "../../@providers/components/ui/sidebar";
import ModelsSidebar from "../../components/containers/sidebar";

import { ReactNode } from "react";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <ModelsSidebar />
        <SidebarInset className="flex-1 p-4 w-full">{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
};
