import React from 'react';

interface EmptyReviewStateProps {
  message: string;
}

export function EmptyReviewState({ message }: EmptyReviewStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xl font-bold">
        !
      </div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
