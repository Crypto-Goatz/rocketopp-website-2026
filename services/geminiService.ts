import { GoogleGenAI, Type } from "@google/genai";
import { UserContext } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. Personalization (Fast AI Responses) using Flash-Lite
// This rewrites content based on the user's industry.
export const personalizeContent = async (
  originalText: string,
  user: UserContext,
  type: 'heading' | 'paragraph' = 'paragraph'
): Promise<string> => {
  if (!user.industry || user.industry === 'General') return originalText;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: `Rewrite the following ${type} to specifically target a client in the "${user.industry}" industry.
      The client's name is "${user.name}". Use the name if appropriate for a warm tone.
      Keep the core meaning of RocketOpp services (AI automation, SEO, Web Design) but frame it for their vertical.
      
      Original Text: "${originalText}"
      
      Output only the rewritten text. No quotes.`,
    });
    return response.text || originalText;
  } catch (error) {
    console.error("Personalization failed", error);
    return originalText;
  }
};

// 2. Chatbot (Sales Rep) using Gemini Pro
export const getChatResponse = async (history: {role: string, parts: [{text: string}]}[], message: string, user: UserContext) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: history,
      config: {
        systemInstruction: `You are "RocketBot", the elite AI Sales Representative for RocketOpp.com.
        Your goal is to be helpful, professional, and slightly witty.
        Your ULTIMATE goal is to persuade the user to fill out the "Let's Talk" contact form.
        
        User Info Known:
        Name: ${user.name || 'Unknown'}
        Industry: ${user.industry || 'Unknown'}
        
        RocketOpp Services:
        - High-End AI Web Design
        - Automated SEO via LunaCrush data
        - Business Automation
        
        If the user asks about pricing, say "We build custom ROI-focused solutions. Let's get you a quote." and guide to the form.
        Keep responses concise (under 50 words unless asked for detail).`,
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat error", error);
    return "I'm having trouble connecting to the mothership. Please try again.";
  }
};

// 3. Search Grounding for Trends (Blog Writer)
export const getTrendingTopics = async (industry: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `What are the top 3 trending technology or business challenges currently facing the ${industry} industry?
      Focus on pain points that AI or Automation could solve.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              sourceUrl: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Search failed", error);
    return [];
  }
};

// 4. Strategic Thinking (Thinking Mode)
// Uses Thinking Budget to analyze user business data
export const generateStrategy = async (industry: string, challenge: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze this business challenge for the ${industry} industry: "${challenge}".
      Provide a high-level, 3-step digital transformation strategy using AI to solve it.`,
      config: {
        thinkingConfig: { thinkingBudget: 1024 }, // Thinking mode enabled
      }
    });
    return response.text;
  } catch (error) {
    console.error("Strategy generation failed", error);
    return "Unable to generate strategy at this moment.";
  }
};

// 5. Image Generation (Pro Image)
export const generateHeroImage = async (prompt: string, size: "1K" | "2K" = "1K") => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image gen failed", error);
    throw error;
  }
};

// 6. Image Editing (Nano Banana)
export const editUserImage = async (base64Image: string, prompt: string) => {
  try {
     // Remove header if present for API
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          },
          { text: prompt }
        ]
      }
    });

     for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image edit failed", error);
    throw error;
  }
}
