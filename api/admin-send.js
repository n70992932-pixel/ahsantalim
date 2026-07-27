module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const TG_TOKEN = process.env.TG_BOT_TOKEN;
    if (!TG_TOKEN) {
      return res.status(500).json({ ok: false, error: 'Bot token serverda (Vercel/Netlify) kiritilmagan' });
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: body.chat_id,
        text: body.text,
        reply_markup: body.reply_markup
      })
    });

    const result = await tgRes.json();
    return res.status(200).json({ ok: result.ok, result });

  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
