const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  // CORS soʻrovlari uchun sarlavhalar
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Metod ruxsat etilmagan' };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Netlify konfiguratsiyasini kod ichida qo'lda ulaymiz
    const store = getStore({
      name: 'site-content',
      siteID: '6a4ab46ee5622c00089c12a3', // Skrinshotingizdagi aniq yuklanish identifikatori
      token: process.env.NETLIFY_AUTH_TOKEN || context.clientContext?.custom?.netlifyToken
    });

    await store.set('content', JSON.stringify(data));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Maʼlumotlar muvaffaqiyatli saqlandi!' })
    };
  } catch (error) {
    console.error('Kontentni saqlashda xatolik:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
