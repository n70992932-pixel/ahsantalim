export default async function handler(req, res) {
  // Faqat POST so'rovlarni qabul qilamiz
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { name, phone, course } = req.body;
  // Environment variables dan token va chat ID ni olamiz (Bu 100% xavfsiz)
  const botToken = process.env.TG_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!botToken || !chatId) {
    return res.status(500).json({ message: 'Server configuration error' });
  }
  const text = `🌟 <b>YANGI ARIZA</b>\n\n👤 <b>Ism:</b> ${name}\n📞 <b>Telefon:</b> ${phone}\n🎓 <b>Kurs:</b> ${course}`;
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });
    if (response.ok) {
      return res.status(200).json({ message: 'Success' });
    } else {
      const errorData = await response.json();
      return res.status(500).json({ message: 'Telegram API error', details: errorData });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
