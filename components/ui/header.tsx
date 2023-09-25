import Card from "@/components/ui/card";
import GoBack from "@/components/buttons/go-back";

export default async function Header({
  showGoBackButton = false,
  children,
}: {
  showGoBackButton?: boolean;
  children: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 flex h-20 items-center gap-3 border-b border-gray-600 p-4 backdrop-blur">
      {showGoBackButton ? <GoBack /> : null}
      <h1 className="text-2xl font-bold ">{children}</h1>
    </header>
  );
}
