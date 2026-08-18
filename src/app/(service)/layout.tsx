export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col sm:max-w-7xl sm:mx-auto w-full">
      {children}
    </div>
  );
}
