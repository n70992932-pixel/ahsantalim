export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const TG_TOKEN = process.env.TG_BOT_TOKEN;
  const TG_CHAT_ID = process.env.TG_CHAT_ID;

  if (!TG_TOKEN || !TG_CHAT_ID) {
    return res.status(500).json({ ok: false, error: 'Server sozlamalari to\'liq emas.' });
  }

  const { studentName, studentPhone, course } = req.body;

  const message = `📚 Yangi ariza!\n\n👤 Ism: ${studentName}\n📞 Telefon: ${studentPhone}\n🎓 Kurs: ${course}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message })
    });
    const result = await response.json();
    return res.status(200).json({ ok: result.ok });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
