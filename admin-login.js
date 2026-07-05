// Admin panel login ekrani uchun - faqat parolni tekshiradi, hech narsa saqlamaydi.

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: 'Server sozlamalari to\'liq emas (ADMIN_PASSWORD yo\'q).' })
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Noto\'g\'ri so\'rov formati.' }) };
  }

  if (data.password !== ADMIN_PASSWORD) {
    return { statusCode: 401, body: JSON.stringify({ ok: false, error: 'Parol noto\'g\'ri.' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true })
  };
};
