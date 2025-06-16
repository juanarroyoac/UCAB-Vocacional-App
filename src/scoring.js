// src/scoring.js
// Este archivo ya no calcula puntajes. Ahora construye el prompt para el análisis de la IA.

/**
 * Construye un prompt detallado para que la IA de Gemini analice las respuestas de un test vocacional.
 * @param {object} answers - Objeto con las respuestas del usuario (id: valor).
 * @param {Array<object>} questions - El array completo de preguntas para dar contexto.
 * @param {Array<object>} careers - El array completo de datos de las carreras.
 * @param {string} userName - Nombre del usuario.
 * @returns {string} - El prompt listo para ser enviado a la IA.
 */
export function generateAnalysisPrompt(answers, questions, careers, userName) {
  // Formatea las respuestas del usuario en texto legible
  const answersText = questions.map(q => {
    const value = answers[q.id];
    let answerText = `No contestada (Valor: ${value})`;
    if (value === 5) answerText = "Totalmente de acuerdo";
    if (value === 4) answerText = "De acuerdo";
    if (value === 3) answerText = "Neutral";
    if (value === 2) answerText = "En desacuerdo";
    if (value === 1) answerText = "Totalmente en desacuerdo";
    if (value === 0) answerText = "No";
    return `- ${q.text}: ${answerText}`;
  }).join("\n");

  // Formatea la lista de carreras en texto legible
  const careersText = careers.map(c => `- ${c.carrera} (${c.facultad})`).join("\n");

  // Prompt para el LLM
  const prompt = `
Eres un orientador vocacional experto de la Universidad Católica Andrés Bello (UCAB). Analiza el perfil del estudiante según sus respuestas y recomienda las carreras más adecuadas de la UCAB. Sé directo, breve y usa solo los datos proporcionados.

**Respuestas del estudiante:**
${answersText}

**Oferta académica de la UCAB:**
${careersText}

**Tu tarea:**
Devuelve SOLO un objeto JSON con la siguiente estructura EXACTA (no incluyas explicaciones, ni texto adicional):

{
  "personality": {
    "name": "Un nombre creativo y simpático para el arquetipo de personalidad (ej: 'El Arquitecto de Ideas', 'El Conector Humano').",
    "description": "Explicación breve (2-3 líneas), ingeniosa y alentadora para este arquetipo, conectando con las respuestas del usuario. No uses el nombre del estudiante."
  },
  "qualities": [
    "Una lista de exactamente 5 cualidades observadas, enunciadas de forma positiva y directa (ej: 'Tienes una curiosidad insaciable por la tecnología', 'Tu empatía abre puertas'). No uses el nombre del estudiante."
  ],
  "careers": [
    {
      "rank": 1,
      "name": "Nombre de la carrera #1 recomendada",
      "story": "Crea una historia corta, inspiradora y futurista (4-5 líneas) imaginando al estudiante triunfando en esta carrera. Debe sentirse personal y evocadora. No uses el nombre del estudiante.",
      "reasoning": "Explica en 3 líneas concisas por qué esta carrera es ideal, refiriendo 2-3 respuestas o cualidades clave. No uses el nombre del estudiante."
    },
    {
      "rank": 2,
      "name": "Nombre de la carrera #2 recomendada",
      "story": "Crea una historia inspiradora similar para la segunda carrera. No uses el nombre del estudiante.",
      "reasoning": "Explica la razón de esta segunda opción según las respuestas del usuario. No uses el nombre del estudiante."
    },
    {
      "rank": 3,
      "name": "Nombre de la carrera #3 recomendada",
      "story": "Crea una historia inspiradora similar para la tercera carrera. No uses el nombre del estudiante.",
      "reasoning": "Explica la razón de esta tercera opción según las respuestas del usuario. No uses el nombre del estudiante."
    }
  ]
}

Recuerda: Devuelve SOLO el objeto JSON, sin explicaciones ni texto adicional. Sé cálido, motivador y directo. No uses el nombre del estudiante excepto en saludos como 'Hola, (nombre)'.`;

  return prompt;
}