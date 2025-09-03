import React from "react";
import { Cpu, Loader2 } from "lucide-react";

interface AIResponsePanelProps {
  response: string;
  isLoading: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function AIResponsePanel({
  response,
  isLoading,
  onAccept,
  onDecline,
}: AIResponsePanelProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="min-h-[100px] flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          ) : (
            <p className="text-gray-700">{response}</p>
          )}
        </div>
        {!isLoading && (
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onDecline}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 