"use client";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

type NavItem = {
  title: string;
  url: string;
  isActive?: boolean;
};

type NavGroup = {
  title: string;
  url: string;
  items: NavItem[];
};

type Data = {
  navMain: NavGroup[];
};

const data: Data = {
  navMain: [
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Cart",
          url: "/dashboard/cart",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <span className="text-lg font-bold  text-primary ">
          Magnetic Cash Challenge
        </span>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
