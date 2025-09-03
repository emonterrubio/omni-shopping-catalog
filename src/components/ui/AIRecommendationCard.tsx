import { Sparkles } from 'lucide-react';
import React from 'react';

export function AIRecommendationCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
      <span className="text-blue-500 mt-1">{/* Icon placeholder */}</span>
      <div>
        <div className="flex items-center text-lg font-medium text-heritageBlue"><Sparkles className="w-5 h-5 text-heritageBlue mr-2" />AI Recommendation</div>
        <div className="text-sm text-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
} 