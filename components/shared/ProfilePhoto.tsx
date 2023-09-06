import Image from "next/image";

const ProfilePhoto = ({ src }: { src?: string | null }) => {
  return (
    <Image
      src={src || "/profile.svg"}
      width={40}
      height={40}
      alt="Profile picture"
      className="object-contain rounded-full"
    />
  );
};

export default ProfilePhoto;
