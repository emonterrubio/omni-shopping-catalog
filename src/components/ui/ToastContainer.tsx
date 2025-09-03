"use client";

import React from "react";
import { useToast } from "../ToastContext";
import { ToastComponent } from "./Toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panels, dynamically insert these into the live region when they need to be displayed */}
          {toasts.map((toast) => (
            <ToastComponent
              key={toast.id}
              toast={toast}
              onRemove={removeToast}
              show={true}
            />
          ))}
        </div>
      </div>
    </>
  );
} 