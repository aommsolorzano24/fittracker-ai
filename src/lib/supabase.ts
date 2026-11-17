import { cookies } from "next/headers";

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new ApiError(503, "Account service is not configured.");
  return { url, key };
}
export async function supabase(path: string, token?: string, init: RequestInit = {}) {
  const { url, key } = config();
  return fetch(`${url}${path}`, { ...init, cache: "no-store", headers: {
    apikey: key, Authorization: `Bearer ${token || key}`, "Content-Type": "application/json", ...init.headers,
  } });
}
export async function account() {
  const token = (await cookies()).get("norden-session")?.value;
  if (!token) throw new ApiError(401, "Sign in to access My Journey.");
  const response = await supabase("/auth/v1/user", token);
  if (!response.ok) throw new ApiError(401, "Session expired. Please sign in again.");
  const user = await response.json();
  return { token, user };
}
export function sameOrigin(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) throw new ApiError(403, "Invalid request origin.");
}
export function failure(error: unknown) {
  return Response.json({ error: error instanceof ApiError ? error.message : "Account service unavailable. Please try again." },
    { status: error instanceof ApiError ? error.status : 503, headers: { "Cache-Control": "no-store" } });
}
export function json(value: unknown) { return Response.json(value, { headers: { "Cache-Control": "no-store" } }); }
