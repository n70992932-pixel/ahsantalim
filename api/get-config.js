export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const url   = process.env.KV_REST_API_URL;
  // Upstash integration turli nomlar bilan token qo'shishi mumkin
  const token = process.env.KV_REST_API_TOKEN ||
                process.env.KV_REST_Y_TOKEN ||
                process.env.KV_REST_I_TOKEN ||
                process.env.UPSTASH_REDIS_REST_TOKEN;
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
