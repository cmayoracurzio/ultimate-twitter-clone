import { cn } from "@/lib/utils/cn";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("w-full overflow-hidden p-4", className)}>
      {children}
    </article>
  );
}
