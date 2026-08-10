'use client';

export function ReviewListSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full py-4 animate-pulse">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row gap-6 p-5 rounded-3xl border border-slate-200 bg-slate-50 h-44 w-full"
        >
          <div className="w-full sm:w-44 h-36 bg-slate-200 rounded-2xl shrink-0" />
          <div className="flex flex-col justify-between flex-1 gap-3">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-6 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
