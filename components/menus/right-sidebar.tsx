import Link from "next/link";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { formatNumber } from "@/lib/utils/numbers";
import Avatar from "@/components/ui/avatar";

const exampleTrends = [
  { name: "Bitcoin", category: "Trending", posts: 1241 },
  { name: "World Cup", category: "Sports", posts: 5003123 },
  { name: "Rock in Rio", category: "Music", posts: 119 },
];

const corporateLinks = [
  { label: "Terms of Use", url: "/terms-of-use" },
  { label: "Privacy Policy", url: "/privacy-policy" },
  { label: "Cookie Policy", url: "/cookie-policy" },
  { label: "About Us", url: "/about" },
];

function UserCard() {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-200 dark:hover:bg-gray-700">
      <div className="flex gap-2">
        <Avatar src={null} alt="avatar" />
        <div>
          <p className="font-bold hover:underline">Full name</p>
          <p className="text-gray-500 dark:text-gray-400">@username</p>
        </div>
      </div>
      <button className="rounded-full bg-primary px-4 py-2 text-center font-semibold text-gray-50 hover:bg-opacity-70">
        Follow
      </button>
    </div>
  );
}

export default async function RightSidebar() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="top-0 hidden h-full min-w-[330px] flex-col gap-4 p-8 lg:flex">
      {/* Search bar */}
      <div className="relative h-12">
        <input
          id="search"
          type="text"
          placeholder="Search Twitter"
          className="peer h-full w-full rounded-full border border-gray-300 bg-gray-100 pl-12 pr-4 outline-none placeholder:text-gray-500 focus:border-primary dark:border-gray-800 dark:bg-gray-800 dark:focus:border-primary"
        />
        <label
          htmlFor="search"
          className="absolute left-0 top-0 flex h-full items-center justify-center pl-4 text-gray-500 peer-focus:text-primary"
        >
          <BsSearch className="h-5 w-5" />
        </label>
      </div>

      {/* Trends for you */}
      <div className="flex flex-col rounded-2xl border border-gray-300 bg-gray-100 dark:border-gray-800 dark:bg-gray-800">
        <h3 className="p-4 text-xl font-semibold">Trends for you</h3>
        {exampleTrends.map((trend) => (
          <Link
            key={trend.name}
            href="/"
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {trend.category}
              </div>
              <div className="text-lg font-semibold">{trend.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formatNumber(trend.posts)} posts
              </div>
            </div>
            <button className="rounded-full p-2 text-gray-400 hover:bg-primary/20 hover:text-primary">
              <BsThreeDots />
            </button>
          </Link>
        ))}
        <Link
          href="/"
          className="rounded-b-xl p-4 text-sm text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Show more
        </Link>
      </div>

      {/* Who to follow */}
      <div className="flex flex-col rounded-2xl border border-gray-300 bg-gray-100 dark:border-gray-800 dark:bg-gray-800">
        <h3 className="p-4 text-xl font-semibold">Who to follow</h3>
        <UserCard />
        <UserCard />
        <UserCard />
        <Link
          href="/"
          className="rounded-b-xl p-4 text-sm text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Show more
        </Link>
      </div>

      {/* Corporate links */}
      <footer className="p-2 pt-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="grid grid-cols-2 gap-2">
          {corporateLinks.map((link) => (
            <Link
              key={link.label}
              href={link.url}
              prefetch={false}
              className="w-fit hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-4">© {currentYear} TechCorp. All rights reserved.</p>
      </footer>
    </section>
  );
}
