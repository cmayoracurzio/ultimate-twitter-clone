import Image from "next/image";

export default function Avatar({
  src,
  size = 40,
  alt,
}: {
  src: string | null;
  size?: number;
  alt: string;
}) {
  return (
    <Image
      src={src || "/default-avatar.svg"}
      width={size}
      height={size}
      priority={true}
      alt={alt}
      className="shrink-0 rounded-full"
    />
  );
}
