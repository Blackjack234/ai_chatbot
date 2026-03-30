import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
   private model;
    constructor(private config:ConfigService){
     const genAI = new GoogleGenerativeAI(
         this.config.getOrThrow<string>('AI_KEY')
     )

     this.model = genAI.getGenerativeModel({
        model:'gemini-2.5-flash',
         systemInstruction:'You are a helpful, friendly assistant. Keep your answers clear and concise.'
     })
    }


    async chat(
        history:{role:string;parts:{text:string}[]}[],
        newMessage:string
    ):Promise<string>{
          const chat = this.model.startChat({history})
          const  result = await chat.sendMessage(newMessage);
          return result.response.text()
    }
}
