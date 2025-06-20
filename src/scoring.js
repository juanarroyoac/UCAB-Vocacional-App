// src/scoring.js
// Enhanced prompt generation for Spotify Wrapped-style analysis

/**
 * Generates an enhanced prompt for Spotify Wrapped-style vocational analysis
 * @param {object} answers - User's answers (id: value)
 * @param {Array<object>} questions - Complete questions array
 * @param {Array<object>} careers - Complete careers data
 * @param {string} userName - User's name
 * @returns {string} - Enhanced prompt for AI analysis
 */
export function generateAnalysisPrompt(answers, questions, careers, userName) {
  // Format answers with context
  const answersText = questions
    .map((q) => {
      const value = answers[q.id]
      let answerText = "No contestada"
      if (value === 5) answerText = "Totalmente de acuerdo"
      if (value === 4) answerText = "De acuerdo"
      if (value === 3) answerText = "Neutral"
      if (value === 2) answerText = "En desacuerdo"
      if (value === 1) answerText = "Totalmente en desacuerdo"
      if (value === 0) answerText = "No"
      return `- ${q.text}: ${answerText}`
    })
    .join("\n")

  // Format careers list
  const careersText = careers.map((c) => `- ${c.carrera} (${c.facultad})`).join("\n")

  // Enhanced prompt for Wrapped-style experience
  const prompt = `
Eres un orientador vocacional experto de la UCAB que crea experiencias estilo "Spotify Wrapped" para estudiantes. Tu tarea es analizar el perfil vocacional y explicar de manera clara y convincente POR QUÉ cada carrera es recomendada.

**Respuestas del estudiante:**
${answersText}

**Oferta académica UCAB:**
${careersText}

**INSTRUCCIONES CRÍTICAS:**
1. Crea contenido ALTAMENTE PERSONALIZADO basado en las respuestas específicas
2. EXPLICA el razonamiento detrás de cada recomendación
3. Conecta directamente las respuestas del estudiante con las características de cada carrera
4. Usa un tono cálido, inspirador y motivacional pero ANALÍTICO
5. Evita nombres propios - usa "tú" o referencias generales
6. Las explicaciones deben ser convincentes y basadas en evidencia

**Devuelve SOLO este JSON (sin explicaciones adicionales):**

{
  "personality": {
    "name": "Un arquetipo único y memorable (ej: 'El Analista Estratégico', 'La Mente Creativa', 'El Constructor de Soluciones')",
    "description": "Una descripción breve y directa de 1-2 líneas que explique este arquetipo basándose en las respuestas. Debe ser concisa y potente.",
    "meaning": "Una explicación de 2-3 líneas sobre qué representa este arquetipo, basado en las respuestas. Explica cómo se relaciona con el trabajo, qué motiva al estudiante y cómo prefiere desarrollarse.",
    "characteristics": [
      "Exactamente 4 características principales en formato de lista, derivadas de las respuestas. Deben ser frases cortas que resuman los puntos clave del arquetipo (ej: 'Perfil único y personalizado', 'Basado en análisis de tus respuestas')."
    ]
  },
  "qualities": [
    {
      "name": "Título de la cualidad 1 (1-2 palabras)",
      "description": "Descripción de la cualidad 1."
    },
    {
      "name": "Título de la cualidad 2 (1-2 palabras)",
      "description": "Descripción de la cualidad 2."
    },
    {
      "name": "Título de la cualidad 3 (1-2 palabras)",
      "description": "Descripción de la cualidad 3."
    },
    {
      "name": "Título de la cualidad 4 (1-2 palabras)",
      "description": "Descripción de la cualidad 4."
    }
  ],
  "careers": [
    {
      "rank": 1,
      "name": "Nombre exacto de la carrera #1",
      "explanation": "Una explicación CONCISA de 1-2 líneas que conecte DIRECTAMENTE las respuestas con esta carrera. Sé breve y ve al grano."
    },
    {
      "rank": 2, 
      "name": "Nombre exacto de la carrera #2",
      "explanation": "Explicación breve (1-2 líneas) para la segunda opción, enfocada en diferentes aspectos de tu perfil."
    },
    {
      "rank": 3,
      "name": "Nombre exacto de la carrera #3", 
      "explanation": "Explicación muy concisa (1-2 líneas) para la tercera opción, resaltando otras conexiones relevantes."
    }
  ]
}

**REGLAS ESTRICTAS:**
- Las explicaciones deben ser CORTAS y directas.
- Cada recomendación debe tener un razonamiento único y diferenciado.
- Usa un lenguaje analítico pero accesible.
- Las carreras deben ser nombres EXACTOS de la lista UCAB.
- NO uses nombres propios del estudiante.
- Prioriza la lógica y conexión directa entre respuestas y recomendaciones.
- Evita generalidades y sé específico.

Crea un análisis que el estudiante entienda completamente y encuentre convincente.`

  return prompt
}
