import GoBack from "@/components/buttons/go-back";
import SwitchTheme from "@/components/buttons/switch-theme";

export default async function Header({
  showGoBackButton,
  children,
}: {
  showGoBackButton?: boolean;
  children: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 flex h-20 items-center justify-between gap-3 border-b border-gray-300 p-4 backdrop-blur dark:border-gray-600">
      <div className="flex items-center justify-start gap-3">
        {showGoBackButton ? <GoBack /> : null}
        <h1 className="text-2xl font-bold">{children}</h1>
      </div>
      <SwitchTheme />
    </header>
  );
}
