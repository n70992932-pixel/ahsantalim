import { kv } from '@vercel/kv';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { password, config } = req.body;
  
  // Admin paneldagi parolni tekshirish
  if (password !== 'Ahsan2026!') {
    return res.status(403).json({ message: 'Ruxsat yo\'q!' });
  }
  
  try {
    await kv.set('site_config', config);
    return res.status(200).json({ message: 'Saqlandi!' });
  } catch(e) {
    return res.status(500).json({ message: 'Saqlashda xato yuz berdi.' });
  }
}
