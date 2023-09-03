import Link from "next/link";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { abbreviateNumber } from "@/lib/utils/abbreviateNumber";
import UserCard from "./UserCard";

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

const RightSidebar = () => {
  return (
    <section className="top-0 min-w-[360px] hidden lg:flex flex-col gap-4 p-8">
      {/* Search bar */}
      <div className="h-12 relative">
        <input
          type="text"
          placeholder="Search Twitter"
          className="w-full h-full pl-12 pr-4 rounded-full outline-none border border-gray-800 bg-gray-800 peer focus:border-primary placeholder:text-gray-500"
        />
        <label className="absolute top-0 left-0 h-full pl-4 flex items-center justify-center text-gray-500 peer-focus:text-primary">
          <BsSearch className="w-5 h-5" />
        </label>
      </div>

      {/* Trends for you */}
      <div className="flex flex-col rounded-2xl bg-gray-800 border border-gray-800">
        <h3 className="font-semibold text-xl p-4">Trends for you</h3>
        {exampleTrends.map((trend) => (
          <Link
            key={trend.name}
            href="/"
            className="hover:bg-gray-700 px-4 py-3 flex justify-between items-center"
          >
            <div>
              <div className="text-xs text-gray-400">{trend.category}</div>
              <div className="font-semibold text-lg">{trend.name}</div>
              <div className="text-xs text-gray-400">
                {abbreviateNumber(trend.posts)} posts
              </div>
            </div>
            <button className="hover:bg-primary/20 text-gray-400 hover:text-primary rounded-full p-2">
              <BsThreeDots />
            </button>
          </Link>
        ))}
        <Link
          href="/"
          className="p-4 hover:bg-gray-700 rounded-b-xl text-sm text-primary"
        >
          Show more
        </Link>
      </div>

      {/* Who to follow */}
      <div className="flex flex-col rounded-2xl bg-gray-800 border border-gray-800">
        <h3 className="font-semibold text-xl p-4">Who to follow</h3>
        <UserCard className="hover:bg-gray-700" />
        <UserCard className="hover:bg-gray-700" />
        <UserCard className="hover:bg-gray-700" />
        <Link
          href="/"
          className="p-4 hover:bg-gray-700 rounded-b-xl text-sm text-primary"
        >
          Show more
        </Link>
      </div>

      {/* Corporate links */}
      <div className="p-2 pt-4 text-xs text-gray-400">
        <div className="grid grid-cols-2 gap-x-1 gap-y-2">
          {corporateLinks.map((link) => (
            <Link key={link.label} href={link.url} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-4">© 2023 TechCorp. All rights reserved.</p>
      </div>
    </section>
  );
};

export default RightSidebar;
