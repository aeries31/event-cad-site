export async function onRequestGet(context) {
  const db = context.env.CAD_DB;
  const name = context.params.name;

  const row = await db.prepare(
    "SELECT name, payload, updated_at FROM cad_projects WHERE name = ?1"
  ).bind(name).first();

  if (!row) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  return Response.json({
    project: JSON.parse(row.payload),
    updated_at: row.updated_at
  }, {
    headers: { "Cache-Control": "no-store" }
  });
}

export async function onRequestPut(context) {
  const db = context.env.CAD_DB;
  const name = context.params.name;
  const body = await context.request.json();

  await db.prepare(`
    INSERT INTO cad_projects (name, payload, updated_at)
    VALUES (?1, ?2, datetime('now'))
    ON CONFLICT(name) DO UPDATE SET
      payload = excluded.payload,
      updated_at = datetime('now')
  `).bind(name, JSON.stringify(body)).run();

  return Response.json({ ok: true, name });
}

export async function onRequestDelete(context) {
  const db = context.env.CAD_DB;
  const name = context.params.name;

  await db.prepare("DELETE FROM cad_projects WHERE name = ?1").bind(name).run();

  return Response.json({ ok: true, name });
}
