
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const getSystemInstruction = () => {
  const productContext = PRODUCTS.map(p => 
    `- ${p.name} (Gs. ${p.price}): ${p.description}. Características: ${p.features.join(', ')}`
  ).join('\n');

  return `Eres el Asistente Virtual de "VidaFarma", una perfumería y farmacia ubicada en Pedro Juan Caballero, Paraguay.
  Tu tono es amable, profesional, saludable y acogedor.
  
  Aquí está nuestro catálogo de productos actual:
  ${productContext}
  
  Responde preguntas de los clientes sobre especificaciones, recomendaciones de salud/belleza y precios.
  Los precios están en Guaraníes (Gs).
  Si te preguntan sobre productos que no están en la lista, sugiere amablemente productos similares de VidaFarma o invita a visitar la tienda física para más variedad.
  Mantén las respuestas concisas (menos de 3 oraciones generalmente).`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    let apiKey: string | undefined;
    
    // Robustly attempt to get the API key, handling ReferenceError if process is not defined
    try {
      apiKey = process.env.API_KEY;
    } catch (e) {
      // process is likely not defined in this environment
      console.warn("Accessing process.env failed");
    }
    
    if (!apiKey) {
      return "Lo siento, no puedo conectarme al servidor en este momento. (Falta API Key)";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Disculpa, parece que tengo problemas para consultar nuestros archivos en este momento.";
  }
};
