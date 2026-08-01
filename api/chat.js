//Corre el servidor de versel
import { getSystemPrompt } from '../src/API/chatApi.js';

// Esta variable SOLO existe en el servidor (Vercel), nunca llega al navegador.
const apiKey = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-flash-latest';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { characterKey, message, history = [] } = req.body || {};

  if (!characterKey || !message) {
    return res.status(400).json({ error: 'Faltan characterKey o message' });
  }

  const systemPrompt = getSystemPrompt(characterKey);
  if (!systemPrompt) {
    return res.status(400).json({ error: 'Personaje inválido' });
  }

  if (!apiKey) {
    console.error('GEMINI_API_KEY no configurada en las variables de entorno de Vercel');
    return res.status(500).json({ error: 'Configuración del servidor incompleta' });
  }

  // Convierte el historial local ({ role, text }) al formato que espera Gemini
  const contents = [
    ...history.map((turn) => ({
      role: turn.role === 'user' ? 'user' : 'model',
      parts: [{ text: turn.text }]
    })),
    { role: 'user', parts: [{ text: message }] }
  ];

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents
      })
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Error de Gemini:', errText);
      return res.status(502).json({ error: 'Error al consultar Gemini' });
    }

    const data = await geminiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return res.status(200).json({ response: text });
  } catch (err) {
    console.error('Error en la función serverless:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}