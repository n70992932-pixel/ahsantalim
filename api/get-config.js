import { kv } from '@vercel/kv';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const config = await kv.get('site_config');
    return res.status(200).json({ config: config || null });
  } catch(e) {
    // KV ulanmagan bo'lsa, null qaytaramiz (default ma'lumotlar ishlatiladi)
    return res.status(200).json({ config: null });
  }
}
