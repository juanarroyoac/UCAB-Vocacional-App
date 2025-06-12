// src/scoring.js
// Este archivo ya no calcula puntajes. Ahora construye el prompt para el análisis de la IA.

/**
 * Construye un prompt detallado para que la IA de Gemini analice las respuestas de un test vocacional.
 * @param {object} answers - Objeto con las respuestas del usuario (id: valor).
 * @param {Array<object>} questions - El array completo de preguntas para dar contexto.
 * @param {Array<object>} careers - El array completo de datos de las carreras.
 * @returns {string} - El prompt listo para ser enviado a la IA.
 */
export function generateAnalysisPrompt(answers, questions, careers) {

  // Mapeamos las respuestas a un formato de texto legible para la IA
  const userProfile = questions.map(q => {
    const answerValue = answers[q.id];
    let answerText = `No contestada (Valor: ${answerValue})`;
    if (answerValue === 5) answerText = "Totalmente de acuerdo";
    if (answerValue === 4) answerText = "De acuerdo";
    if (answerValue === 3) answerText = "Neutral";
    if (answerValue === 2) answerText = "En desacuerdo";
    if (answerValue === 1) answerText = "Totalmente en desacuerdo";
    
    return `- ${q.text}: ${answerText}`;
  }).join("\n");

  // Convertimos los datos de las carreras a una cadena de texto que la IA pueda leer.
  const careersText = JSON.stringify(careers, null, 2);

  // El prompt le da a la IA un rol, contexto, los datos y una tarea muy específica.
  // Es crucial pedirle que devuelva un JSON estructurado para poderlo usar en el frontend.
  const prompt = `
    Eres un orientador vocacional experto de la Universidad Católica Andrés Bello (UCAB). Tu tarea es analizar el perfil de un estudiante basándote en sus respuestas a un test vocacional y recomendarle las carreras más adecuadas de la oferta de la UCAB. Debes ser alentador, perspicaz y basar tu análisis estrictamente en los datos proporcionados.

    **Contexto:**
    1.  **Perfil del Estudiante (basado en sus respuestas):**
        ${userProfile}

    2.  **Oferta Académica de la UCAB (Datos Completos):**
        ${careersText}

    **Tu Tarea:**
    Realiza un análisis profundo y genera una respuesta en formato JSON. El JSON debe tener la siguiente estructura:
    {
      "resumen_perfil": "Un párrafo que describa las principales inclinaciones, intereses y aptitudes del estudiante basándote en un análisis holístico de sus respuestas.",
      "carreras_recomendadas": [
        {
          "carrera": "Nombre de la Carrera 1",
          "afinidad": "Alta",
          "justificacion": "Un párrafo detallado y personalizado explicando POR QUÉ esta carrera es una buena opción. Debes conectar respuestas específicas del estudiante (ej: 'Tu interés en la tecnología y la resolución de problemas...') con aspectos clave del perfil de la carrera (ej: '...se alinea perfectamente con la Ingeniería Informática, que se enfoca en el desarrollo de software...')."
        },
        {
          "carrera": "Nombre de la Carrera 2",
          "afinidad": "Media",
          "justificacion": "Un párrafo similar al anterior, explicando la conexión entre las respuestas del estudiante y el perfil de esta segunda carrera recomendada."
        },
        {
          "carrera": "Nombre de la Carrera 3",
          "afinidad": "Considerable",
          "justificacion": "Un párrafo similar para una tercera opción, quizás destacando un potencial que el estudiante no haya considerado."
        }
      ]
    }

    **Instrucciones Importantes:**
    - Recomienda exactamente 3 carreras.
    - El análisis debe ser profundo, no superficial. No te limites a contar palabras clave; interpreta el significado detrás de las respuestas.
    - Asegúrate de que la salida sea un único bloque de código JSON válido, sin texto adicional antes o después.
  `;

  return prompt;
}