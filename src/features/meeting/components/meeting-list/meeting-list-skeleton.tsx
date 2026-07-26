export function MeetingListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full py-4 animate-pulse">
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row gap-4 p-5 rounded-3xl border border-zinc-200  bg-zinc-100  h-48 w-full"
        >
          <div className="w-full sm:w-44 h-36 bg-zinc-200  rounded-2xl shrink-0" />
          <div className="flex flex-col justify-between flex-1 gap-3">
            <div className="h-4 bg-zinc-200 rounded w-1/3" />
            <div className="h-6 bg-zinc-200 rounded w-3/4" />
            <div className="h-4 bg-zinc-200  rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
