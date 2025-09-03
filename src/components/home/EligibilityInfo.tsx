import React from "react";
import { User, Home, Clock, AlertCircle } from "lucide-react";
import { EligibilityData } from "@/types";

interface EligibilityInfoProps {
  data: EligibilityData;
}

export function EligibilityInfo({ data }: EligibilityInfoProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Eligibility</h2>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-medium text-gray-900">{data.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Role</p>
            <p className="font-medium text-gray-900">{data.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-medium text-gray-900">{data.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Refresh Cycle</p>
            <p className="font-medium text-gray-900">{data.refreshCycle}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Approvals</p>
          <p className="font-medium text-gray-900">{data.approvals}</p>
        </div>
      </div>
    </section>
  );
} 