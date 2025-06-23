"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

const PATH_LABELS: Record<string, string> = {
  "": "Inicio",
  dashboard: "Dashboard",
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    return {
      label:
        PATH_LABELS[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1),
      href: idx < segments.length - 1 ? href : undefined,
    };
  });

  const allCrumbs = [
    {
      label: PATH_LABELS[""] || "Inicio",
      href: segments.length > 0 ? "/" : undefined,
    },
    ...crumbs,
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {allCrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <BreadcrumbItem>
              {crumb.href ? (
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {idx < allCrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
