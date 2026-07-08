export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { password, config } = req.body;
  if (password !== 'Ahsan2026!') {
    return res.status(403).json({ message: "Ruxsat yo'q!" });
  }
  const url   = process.env.KV_REST_API_URL;
  // Upstash integration turli nomlar bilan token qo'shishi mumkin
  const token = process.env.KV_REST_API_TOKEN ||
                process.env.KV_REST_Y_TOKEN ||
                process.env.KV_REST_I_TOKEN ||
                process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return res.status(500).json({ message: 'KV ulanmagan. Vercel sozlamalarini tekshiring.' });
  }
  try {
    // Upstash pipeline: SET key value
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([["SET", "site_config", JSON.stringify(config)]])
    });
    if (response.ok) {
      return res.status(200).json({ message: 'Saqlandi!' });
    } else {
      const err = await response.text();
      return res.status(500).json({ message: 'Upstash xatosi', detail: err });
    }
  } catch(e) {
    return res.status(500).json({ message: 'Server xatosi', error: e.message });
  }
}
