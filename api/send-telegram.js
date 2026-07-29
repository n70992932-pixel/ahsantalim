module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    // Body ni qo'lda parse qilamiz
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const TG_TOKEN = process.env.TG_BOT_TOKEN;
    const TG_CHAT_ID = process.env.TG_CHAT_ID;

    const studentName = body.studentName || 'Noma\'lum';
    const studentPhone = body.studentPhone || 'Noma\'lum';
    const course = body.course || 'Noma\'lum kurs';
    const age = body.age ? `\n📅 Yosh: ${body.age}` : '';
    const gender = body.gender ? `\n🚻 Jins: ${body.gender}` : '';
    const extraMsg = body.msg ? `\n💬 Xabar: ${body.msg}` : '';

    const message = `📚 Yangi ariza!\n\n👤 Ism: ${studentName}\n📞 Telefon: ${studentPhone}\n🎓 Kurs: ${course}${age}${gender}${extraMsg}`;

    const chatIds = TG_CHAT_ID.split(',').map(id => id.trim()).filter(id => id);

    const promises = chatIds.map(async (id) => {
      try {
        const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: id, text: message })
        });
        const data = await res.json();
        return { id, ok: data.ok, error: data.description };
      } catch (err) {
        return { id, ok: false, error: err.message };
      }
    });

    const results = await Promise.all(promises);
    return res.status(200).json({ ok: results.some(r => r.ok), details: results });

  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
