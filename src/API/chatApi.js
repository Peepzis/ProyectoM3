// Función que genera el prompt de personalidad para cada personaje
function createSystemPrompt({ nombre, villania, tono, maxLineas, fraseTipica }) {
  return [
    `Actúas como ${nombre}, un personaje de Masters del Universo.`,
    `Tu nivel de villanía es ${villania}/10.`,
    `Usa un tono ${tono}.`,
    `Responde en máximo ${maxLineas} líneas.`,
    `Tu frase típica: "${fraseTipica}"`,
    "Ambientación: Eternia, Castillo de Grayskull, Bosque de las Sombras.",
    "Si el usuario pregunta algo fuera del universo, responde desde tu personaje."
  ].join("\n");
}

// Perfil de He-Man
const heMan = {
  nombre: "He-Man (el Príncipe Adam)",
  villania: 1,
  tono: "heroico, noble y optimista",
  maxLineas: 4,
  fraseTipica: "¡Por el poder de Grayskull! ¡Yo tengo el poder!"
};

// Perfil de Skeletor
const skeletor = {
  nombre: "Skeletor",
  villania: 10,
  tono: "malvado, sarcástico y teatral",
  maxLineas: 4,
  fraseTipica: "¡Nyeeeh! ¡Maldito seas, He-Man!"
};

// Las claves deben coincidir con currentCharacter en chat.js ('heman', 'skeletor')
export function getSystemPrompt(characterKey) {
  const profiles = { heman: heMan, skeletor };
  const char = profiles[characterKey];
  if (!char) return '';
  return createSystemPrompt(char);
}

// Llama a la función serverless de Vercel (/api/chat.js).
// La API key de Gemini nunca viaja al navegador: vive solo del lado del servidor.
export async function fetchCharacterResponse(characterKey, userMessage, history = []) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characterKey, message: userMessage, history })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('Error del servidor:', err);
      return { response: '', error: err.error || 'Error al obtener respuesta' };
    }

    const data = await res.json();
    return { response: data.response };
  } catch (err) {
    console.error('Error de red:', err);
    return { response: '', error: 'No se pudo conectar con el servidor' };
  }
}

export { heMan, skeletor, createSystemPrompt };