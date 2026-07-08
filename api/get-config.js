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
    // Upstash /get returns {"result": value}
    // value could be a JSON object or a JSON string depending on how it was saved
    let config = null;
    if (data.result !== null && data.result !== undefined) {
      config = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
    }
    return res.status(200).json({ config });
  } catch(e) {
    return res.status(200).json({ config: null });
  }
}
