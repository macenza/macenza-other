import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { contents, systemInstruction } = req.body;

  // Load API key from server environment
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: contents,
      config: {
        systemInstruction
      }
    });

    return res.status(200).json({ text: response.text || '' });
  } catch (error) {
    console.error('Gemini Serverless Error:', error);
    return res.status(500).json({ error: error.message || 'Error generating AI response.' });
  }
}
