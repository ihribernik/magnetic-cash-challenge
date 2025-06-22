import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import { LogoutButton } from "@/components/logout-button";
import { CartIcon } from "@/components/cart-icon";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex items-center w-full">
            <div className="flex-1">
              <DynamicBreadcrumb />
            </div>
            <CartIcon />
            <LogoutButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
