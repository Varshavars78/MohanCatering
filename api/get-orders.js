import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return res.status(500).json({ error: "No service key configured" });

  const r = await fetch(`${supabaseUrl}/rest/v1/orders?select=*`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  });

  const data = await r.json();
  res.json(data);
}
