"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { QuickActions } from "./QuickActions";

export function QuickActionsClient({ actions }: { actions: any[] }) {
  const router = useRouter();
  const handleActionClick = (query: string) => {
    if (query === "Developer Setup") {
      router.push("/checkout");
    }
    // Add other action logic here if needed
  };
  return <QuickActions actions={actions} onActionClick={handleActionClick} />;
} 