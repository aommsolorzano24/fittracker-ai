import { cookies } from "next/headers";
import { account, ApiError, failure, json, sameOrigin, supabase } from "../../../lib/supabase";

export async function GET() {
  try {
    const { token, user } = await account();
    const r = await supabase("/rest/v1/rpc/has_active_premium", token, { method: "POST", body: "{}" });
    if (!r.ok) throw new ApiError(503, "Subscription service unavailable.");
    return json({ email: user.email, premium: await r.json() });
  } catch (error) { return failure(error); }
}
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const { email, password } = await request.json();
    if (typeof email !== "string" || typeof password !== "string" || email.length > 320 || password.length > 1024) throw new ApiError(400, "Enter your email and password.");
    const r = await supabase("/auth/v1/token?grant_type=password", undefined, { method: "POST", body: JSON.stringify({ email, password }) });
    if (!r.ok) throw new ApiError(401, "Unable to sign in. Check your credentials.");
    const session = await r.json();
    (await cookies()).set("norden-session", session.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: session.expires_in });
    return json({ signedIn: true });
  } catch (error) { return failure(error); }
}
export async function DELETE(request: Request) {
  try {
    sameOrigin(request);
    const token = (await cookies()).get("norden-session")?.value;
    (await cookies()).delete("norden-session");
    if (token) await supabase("/auth/v1/logout", token, { method: "POST" });
    return json({ signedIn: false });
  } catch (error) { return failure(error); }
}
