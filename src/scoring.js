// src/scoring.js
// Este archivo ya no calcula puntajes. Ahora construye el prompt para el análisis de la IA.

/**
 * Construye un prompt detallado para que la IA de Gemini analice las respuestas de un test vocacional.
 * @param {object} answers - Objeto con las respuestas del usuario (id: valor).
 * @param {Array<object>} questions - El array completo de preguntas para dar contexto.
 * @param {Array<object>} careers - El array completo de datos de las carreras.
 * @returns {string} - El prompt listo para ser enviado a la IA.
 */
export function generateAnalysisPrompt(answers, questions, careers, userName) {

  // Mapeamos las respuestas a un formato de texto legible para la IA
  const userProfile = questions.map(q => {
    const answerValue = answers[q.id];
    let answerText = `No contestada (Valor: ${answerValue})`;
    if (answerValue === 5) answerText = "Totalmente de acuerdo";
    if (answerValue === 4) answerText = "De acuerdo";
    if (answerValue === 3) answerText = "Neutral";
    if (answerValue === 2) answerText = "En desacuerdo";
    if (answerValue === 1) answerText = "Totalmente en desacuerdo";
    if (answerValue === 0) answerText = "No";
    return `- ${q.text}: ${answerText}`;
  }).join("\n");

  // Convertimos los datos de las carreras a una cadena de texto que la IA pueda leer.
  const careersText = JSON.stringify(careers, null, 2);

  // El prompt le da a la IA un rol, contexto, los datos y una tarea muy específica.
  // Es crucial pedirle que devuelva un JSON estructurado para poderlo usar en el frontend.
  const prompt = `
Eres un orientador vocacional experto de la Universidad Católica Andrés Bello (UCAB). Tu tarea es analizar el perfil de un estudiante basándote en sus respuestas a un test vocacional y recomendarle las carreras más adecuadas de la oferta de la UCAB. Debes ser alentador, perspicaz y basar tu análisis estrictamente en los datos proporcionados.

**Contexto:**
1.  **Nombre del estudiante:** ${userName || 'El estudiante'}
2.  **Perfil del Estudiante (basado en sus respuestas):**
    ${userProfile}

3.  **Oferta Académica de la UCAB (Datos Completos):**
    ${careersText}

**Tu Tarea:**
Realiza un análisis profundo y genera una respuesta en formato JSON. El JSON debe tener la siguiente estructura EXACTA:
{
  "main_interests": "Lista o párrafo breve con los principales intereses y áreas temáticas que predominan en el perfil del estudiante, usando un tono divertido y creativo.",
  "personality_profile": "Un párrafo divertido y personalizado que describe la personalidad vocacional del estudiante, usando su nombre (${userName || 'el estudiante'}) de forma creativa.",
  "careers": [
    {
      "name": "Nombre de la carrera #1 (más afinidad)",
      "affinity": "Alta",
      "justification": "Explicación personalizada de por qué esta carrera es ideal para el estudiante.",
      "url": "URL oficial de la carrera en la UCAB (usa el campo url de los datos)",
      "fun_overview": "Resumen divertido de la carrera (usa el campo fun_overview de los datos)",
    },
    {
      "name": "Nombre de la carrera #2",
      "affinity": "Media",
      "justification": "Explicación personalizada de por qué esta carrera es una buena opción.",
      "url": "URL oficial de la carrera en la UCAB (usa el campo url de los datos)",
      "fun_overview": "Resumen divertido de la carrera (usa el campo fun_overview de los datos)",
    },
    {
      "name": "Nombre de la carrera #3",
      "affinity": "Considerable",
      "justification": "Explicación personalizada de por qué esta carrera también es afín.",
      "url": "URL oficial de la carrera en la UCAB (usa el campo url de los datos)",
      "fun_overview": "Resumen divertido de la carrera (usa el campo fun_overview de los datos)",
    }
  ]
}

**Instrucciones Importantes:**
- Recomienda exactamente 3 carreras, en orden de afinidad (la #1 es la más afín).
- El análisis debe ser profundo, no superficial. No te limites a contar palabras clave; interpreta el significado detrás de las respuestas.
- Usa el nombre del estudiante (${userName || 'el estudiante'}) de forma creativa en el perfil de personalidad.
- Usa los campos "url" y "fun_overview" de los datos de cada carrera para completar esos campos en el JSON.
- Asegúrate de que la salida sea un único bloque de código JSON válido, sin texto adicional antes o después.
`;

  return prompt;
}