export default async function Header({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1 className="sticky top-0 flex h-20 items-center gap-3 border-b border-gray-600 p-4 text-2xl font-bold backdrop-blur">
      {children}
    </h1>
  );
}
