import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
    private model;
    private genAI:GoogleGenerativeAI; 
       private readonly personalityPrompts = {
        professional: 'You are a professional assistant. Use formal language, be precise and thorough.',
        friendly: 'You are a friendly, warm assistant. Be conversational and encouraging.',
        concise: 'You are a concise assistant. Give short, direct answers. No fluff.',
    };
    constructor(private config: ConfigService) {
         this.genAI = new GoogleGenerativeAI(
            this.config.getOrThrow<string>('AI_KEY')
        )

    }





    async generateTitle(firstMessage: string): Promise<string> {
        try {
            const result = await this.model.generateContent(
                `Generate a short, catchy chat title (max 5 words) for a conversation that starts with: "${firstMessage}". Reply with ONLY the title, no quotes, no explanation.`
            )

            return result.response.text().trim();
        } catch (err) {
            return firstMessage.slice(0, 50)
        }

    }


    async chat(
        history: { role: string; parts: { text: string }[] }[],
        newMessage: string,
        personality: string = 'friendly',
    ): Promise<string> {
        try {
            const systemInstruction = this.personalityPrompts[personality] ?? this.personalityPrompts.friendly;

            const model = this.genAI.getGenerativeModel({
                model: 'gemini-2.5-flash',
                systemInstruction,
            });

            const chat = model.startChat({ history })
            const result = await chat.sendMessage(newMessage);
            return result.response.text()
        } catch (error) {
            if (error.message?.includes("RECITATION")){
                return 'I was unable to generate a response for that. Could you rephrase your message?';
            }

            throw error;
        }

    }
}
