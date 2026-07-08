export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return res.status(200).json({ config: null });
  }
  try {
    const response = await fetch(`${url}/get/site_config`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    // Upstash result is a string, parse it back to object
    const config = data.result ? JSON.parse(data.result) : null;
    return res.status(200).json({ config });
  } catch(e) {
    return res.status(200).json({ config: null });
  }
}
