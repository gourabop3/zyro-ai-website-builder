"use server";
import { CODE_CHAT_PROMPT, NO_CODE_CHAT_PROMPT } from "@/constants/prompts";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI(apiKey as any);

export async function noCodeChat(prompt: string) {
  const chat = ai.chats.create({
    model: "gemini-1.5-flash",
    history: [],
    config: {
      systemInstruction: NO_CODE_CHAT_PROMPT.toString(),
      responseMimeType: "text/plain",
    },
  });

  const response = await chat.sendMessage({
    message: prompt,
  });

  return response.text;
}

export async function codeChat(prompt: string) {
  const chat = ai.chats.create({
    model: "gemini-1.5-flash",
    history: [],
    config: {
      responseMimeType: "application/json",
      systemInstruction: CODE_CHAT_PROMPT.toString(),
    },
  });

  const response = await chat.sendMessage({
    message: prompt,
  });

  return response.text;
}
