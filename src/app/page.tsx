import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <Button className="bg-blue-500 text-white" variant="ghost">
          Click me
        </Button>
      </main>
    </div>
  );
}
