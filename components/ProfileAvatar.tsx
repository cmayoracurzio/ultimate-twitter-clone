import Image from "next/image";

export default function ProfileAvatar({
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
      alt="Profile picture"
      className="shrink-0 rounded-full"
    />
  );
}
