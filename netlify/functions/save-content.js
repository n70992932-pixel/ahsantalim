// Bu funksiya ADMIN PANEL orqali yuborilgan yangi kontentni saqlaydi.
// Parol process.env.ADMIN_PASSWORD orqali Netlify Environment Variables'da saqlanadi
// va hech qachon frontend kodida ko'rinmaydi.

const { getStore } = require('@netlify/blobs');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable topilmadi.');
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

  const { password, content } = data || {};

  if (password !== ADMIN_PASSWORD) {
    return { statusCode: 401, body: JSON.stringify({ ok: false, error: 'Parol noto\'g\'ri.' }) };
  }

  if (!content || typeof content !== 'object') {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Kontent ma\'lumoti topilmadi.' }) };
  }

  try {
    const store = getStore('ahsan-talim-content');
    await store.setJSON('main', content);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    console.error('Kontentni saqlashda xatolik:', err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Serverga saqlashda xatolik yuz berdi.' }) };
  }
};
