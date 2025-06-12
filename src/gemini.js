// src/gemini.js
// Este archivo configura y exporta la función para interactuar con la API de Gemini.


import { GoogleGenerativeAI } from "@google/generative-ai";

// Obtenemos la API Key de nuestras variables de entorno.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY no se encuentra en el archivo .env");
}


const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Función asíncrona que podemos llamar desde cualquier parte de la app.
export async function runAiInteraction(prompt) {
  try {
    console.log('[Gemini] Sending prompt:', prompt);
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
    // The SDK returns a response object with a candidates array
    const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || result?.response?.text;
    console.log('[Gemini] Received response:', text);
    return text;
  } catch (error) {
    // Enhanced error logging for debugging and rate limit info
    if (error && error.response) {
      console.error('[Gemini] API Error:', error.response.status, error.response.statusText);
      try {
        const errorData = await error.response.json();
        console.error('[Gemini] API Error details:', errorData);
        if (error.response.status === 429) {
          return 'Error: Se ha excedido el límite de uso de la API de Gemini. Intenta de nuevo más tarde.';
        }
      } catch (parseErr) {
        console.error('[Gemini] Error parsing error response:', parseErr);
      }
    } else {
      console.error('[Gemini] Error interacting with Gemini API:', error);
    }
    return 'Error: No se pudo obtener respuesta de Gemini.';
  }
}