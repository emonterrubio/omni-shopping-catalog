import React from "react";
import { QuickAction } from "@/types";
import { ArrowRight } from "lucide-react";

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick: (query: string) => void;
}

function QuickActionCard({ action, onActionClick }: { action: QuickAction; onActionClick: (query: string) => void }) {
  return (
    <button
      key={action.id}
      onClick={() => onActionClick(action.title)}
      className="w-full bg-white rounded-lg px-6 py-4 hover:shadow-md transition flex items-center justify-between border border-gray-200 rounded-md"
    >
      <div className="text-left">
        <h3 className="font-medium text-blue-600 text-base">{action.title}</h3>
        <p className="text-sm text-gray-700 font-regular leading-snug">{action.description}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" aria-hidden="true" />
    </button>
  );
}

export function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  return (
    <section className="mt-4 mb-8">
      <h2 className="font-semibold text-xl text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {actions.map((action) => (
          <QuickActionCard key={action.id} action={action} onActionClick={onActionClick} />
        ))}
      </div>
    </section>
  );
} 