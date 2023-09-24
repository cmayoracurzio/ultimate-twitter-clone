export function getBaseUrl(): string {
  console.log(process.env.NEXT_PUBLIC_SITE_URL);
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL);

  let url =
    process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000";

  console.log(url);

  // Make sure to include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`;

  // Make sure to include trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;

  return url;
}
