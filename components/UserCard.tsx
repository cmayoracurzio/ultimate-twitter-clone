import ProfileAvatar from "./ProfileAvatar";

const UserCard = ({ className }: { className: string }) => {
  return (
    <div
      className={`px-4 py-3 flex justify-between items-center text-sm ${className}`}
    >
      <div className="flex gap-2">
        <ProfileAvatar />
        <div>
          <p className="font-bold hover:underline">Full name</p>
          <p className="text-gray-400">@username</p>
        </div>
      </div>
      <button className="rounded-full py-2 px-4 bg-primary font-semibold text-center hover:bg-opacity-70">
        Follow
      </button>
    </div>
  );
};

export default UserCard;
