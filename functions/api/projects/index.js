export async function onRequestGet(context) {
  const db = context.env.CAD_DB;
  const { results } = await db.prepare(
    "SELECT name, updated_at FROM cad_projects ORDER BY updated_at DESC"
  ).all();

  return Response.json({ projects: results || [] }, {
    headers: { "Cache-Control": "no-store" }
  });
}
