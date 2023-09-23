import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 p-4 text-center text-gray-50">
      <p className="text-base font-semibold text-primary">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-6 text-gray-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-6 py-3 text-xl font-semibold hover:bg-opacity-70"
      >
        Go back home
      </Link>
    </main>
  );
}
