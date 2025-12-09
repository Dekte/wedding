import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateWeddingWish = async (name: string, message: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a cool, edgy, Y2K-obsessed wedding bot named "PixelHeart-9000".
      A guest named "${name}" just left this message in the wedding guestbook: "${message}".
      
      Write a short, fun, slightly chaotic but grateful response. 
      Use internet slang from the early 2000s (like LOL, ROFL, xD), maybe some Japanese emoticons (kaomoji), and refer to the wedding as the "ultimate collab" or "system upgrade".
      Keep it under 30 words.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "SYSTEM ERROR: LOVE OVERLOAD xD";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Thanks for the message! (AI is rebooting...)";
  }
};