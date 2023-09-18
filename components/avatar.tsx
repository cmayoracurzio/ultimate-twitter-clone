import Image from "next/image";

export default function Avatar({
  src,
  size = 40,
}: {
  src?: string | null;
  size?: number;
}) {
  return (
    <Image
      src={src || "/profile.svg"}
      width={size}
      height={size}
      alt="Profile avatar"
      className="shrink-0 rounded-full"
    />
  );
}
