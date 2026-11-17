import { account, ApiError, failure, json, sameOrigin, supabase } from "../../../lib/supabase";
import { workoutBlocks, trainingDays } from "../../../lib/workoutBlocks";
async function call(action: string, goal: string | null = null, revision: number | null = null) {
  const { token } = await account();
  const r = await supabase("/rest/v1/rpc/journey_action", token, { method: "POST", body: JSON.stringify({ action, goal, expected_revision: revision }) });
  if (!r.ok) {
    const body = await r.json();
    if (body.message === "premium_required") throw new ApiError(403, "Premium is required for workout routines.");
    if (body.message === "revision_conflict") throw new ApiError(409, "Progress changed in another window. Reload before continuing.");
    throw new ApiError(r.status === 400 ? 400 : 503, "Unable to update journey. Please reload and try again.");
  }
  return json({ journey: await r.json(), blocks: workoutBlocks, trainingDays });
}
export async function GET() { try { return await call("read"); } catch (e) { return failure(e); } }
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const body = await request.json();
    if (!["select", "advance"].includes(body.action) || !Number.isInteger(body.revision) || body.revision < 0 ||
      (body.action === "select" && !workoutBlocks.some(b => b.name === body.goal))) throw new ApiError(400, "Invalid journey action.");
    return await call(body.action, body.action === "select" ? body.goal : null, body.revision);
  } catch (e) { return failure(e); }
}
