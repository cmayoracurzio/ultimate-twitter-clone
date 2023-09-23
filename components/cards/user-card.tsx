import Avatar from "@/components/avatar";

export default async function UserCard({ className }: { className: string }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 text-sm ${className}`}
    >
      <div className="flex gap-2">
        <Avatar />
        <div>
          <p className="font-bold hover:underline">Full name</p>
          <p className="text-gray-400">@username</p>
        </div>
      </div>
      <button className="rounded-full bg-primary px-4 py-2 text-center font-semibold hover:bg-opacity-70">
        Follow
      </button>
    </div>
  );
}
