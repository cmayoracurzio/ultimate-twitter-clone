export default async function Header({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1 className="sticky top-0 border-b border-gray-600 p-6 text-2xl font-bold backdrop-blur">
      {children}
    </h1>
  );
}
