import { Injectable, NotFoundException } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import { SessionService } from '../session/session.service';
import { SendMessageDto } from './dtos/chat.dto';

@Injectable()
export class ChatService {

    constructor(private readonly sessionService: SessionService, private readonly geminiService: GeminiService) { }

    async sendMessage(dto: SendMessageDto) {
        let session;
        if (dto.sessionId) {
            session = await this.sessionService.getSession(dto.sessionId);
            if (!session) throw new NotFoundException('session not found')
        } else {
            session =await this.sessionService.createSession(dto.message)
          
        }

        let history = session.messages.map((msg)=>({
            role:msg.role,
            parts:[{text:msg.content}]
        }))

        const reply = await this.geminiService.chat(history,dto.message)


        await this.sessionService.addMessage(session.sessionId,'user',dto.message);
        await this.sessionService.addMessage(session.sessionId,'model',reply)

        return  {
          sessionId:session.sessionId,
          reply,
          messageCount:session.messages.length+2
        }
    }


    async GetHistory(sessionId:string){
     const session = await this.sessionService.getSession(sessionId);

     if(!session) throw new NotFoundException('session not found.')
        return session
    }


    async listSessions(){
        return this.sessionService.listSessions()
    }

    async deleteSession(sessionId:string){
        const session = await this.sessionService.deleteSession(sessionId);
        if(!session) throw new NotFoundException('session not found.')
            return {message:'session deleted successfully.'}
    }

}
