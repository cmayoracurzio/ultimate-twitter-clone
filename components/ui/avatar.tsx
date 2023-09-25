import Image from "next/image";

export default function Avatar({
  src,
  priority = false,
  size = 40,
}: {
  src?: string | null;
  priority?: boolean;
  size?: number;
}) {
  return (
    <Image
      src={src || "/default-avatar.svg"}
      width={size}
      height={size}
      priority={priority}
      alt="Profile avatar"
      className="shrink-0 rounded-full"
    />
  );
}
