// Bu funksiya SERVER tomonida ishlaydi (Netlify Functions).
// Bot tokeni va Chat ID bu yerda emas, balki Netlify saytining
// "Environment variables" bo'limida saqlanadi -> shuning uchun
// brauzer orqali hech kim uni ko'ra olmaydi.

exports.handler = async function (event) {
  // Faqat POST so'rovlarga ruxsat
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const TG_TOKEN = process.env.TG_BOT_TOKEN;
  const TG_CHAT_ID = process.env.TG_CHAT_ID;

  if (!TG_TOKEN || !TG_CHAT_ID) {
    console.error('TG_BOT_TOKEN yoki TG_CHAT_ID environment variable topilmadi.');
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
  const time = (data.time || '').toString().trim().slice(0, 100);

  if (!studentName || !studentPhone) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: 'Ism va telefon raqami majburiy.' })
    };
  }

  // HTML-injection'ning oldini olish uchun maxsus belgilarni escape qilamiz
  const escapeHtml = (str) =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const message =
    `🔔 <b>YANGI ARIZA (Ahsan Ta'lim)</b>\n` +
    `━━━━━━━━━━━━━━━━━━\n` +
    `👤 <b>Ism:</b> ${escapeHtml(studentName)}\n` +
    `📞 <b>Tel:</b> ${escapeHtml(studentPhone)}\n` +
    `📚 <b>Kurs:</b> ${escapeHtml(course)}\n` +
    `━━━━━━━━━━━━━━━━━━\n` +
    `🕒 <b>Vaqt:</b> ${escapeHtml(time)}\n` +
    `🌐 <b>Sayt:</b> ahsantalim.netlify.app`;

  try {
    const tgResponse = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!tgResponse.ok) {
      const errText = await tgResponse.text();
      console.error('Telegram API xatoligi:', errText);
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: 'Telegramga yuborishda xatolik.' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Server xatoligi:', err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Server xatoligi.' }) };
  }
};
