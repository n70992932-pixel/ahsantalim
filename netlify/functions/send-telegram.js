exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const TG_TOKEN = process.env.TG_BOT_TOKEN;
  const TG_CHAT_ID = process.env.TG_CHAT_ID;

  if (!TG_TOKEN || !TG_CHAT_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: 'Server sozlamalari to\'liq emas.' })
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Noto\'g\'ri so\'rov formati.' }) };
  }

  const studentName = (data.studentName || '').toString().trim().slice(0, 200);
  const studentPhone = (data.studentPhone || '').toString().trim().slice(0, 50);
  const course = (data.course || "Noma'lum kurs").toString().trim().slice(0, 200);

  const message = `📚 Yangi ariza!\n\n👤 Ism: ${studentName}\n📞 Telefon: ${studentPhone}\n🎓 Kurs: ${course}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: 'HTML' })
    });
    const result = await response.json();
    if (!result.ok) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, error: result.description }) };
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: err.message }) };
  }
};
