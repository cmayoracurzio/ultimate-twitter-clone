import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <p className="font-semibold text-primary">404</p>
      <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
      <p className="mt-6 text-gray-500 dark:text-gray-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-6 py-3 text-xl font-semibold text-gray-50 hover:bg-opacity-70"
      >
        Go back home
      </Link>
    </main>
  );
}
