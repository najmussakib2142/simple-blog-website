export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // client: use relative path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // production
  return "http://localhost:3000"; // local dev
}
