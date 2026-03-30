import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dtos/chat.dto';

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService:ChatService){}

    @Post()
    async sendMessage(@Body() dto:SendMessageDto){
       return this.chatService.sendMessage(dto)
    }

    @Get('sessions')
    listSessions(){
        return this.chatService.listSessions()
    }

    @Get(":sessionId")
    async getHistory(@Param('sessionId') sessionId:string){
    return await this.chatService.GetHistory(sessionId)
    }

    @Delete(":sessionId")
    async deleteSession(@Param("sessionId") sessionId:string){
      return await this.chatService.deleteSession(sessionId)
    }
}
