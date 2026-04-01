import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dtos/chat.dto';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService:ChatService){}

    @Post()
    @ApiConsumes("application/json")
    @ApiOperation({ summary: 'Send a message to the AI' })
    @ApiResponse({ status: 201, description: 'AI reply returned successfully' })
    async sendMessage(@Body() dto:SendMessageDto){
       return this.chatService.sendMessage(dto)
    }



    @Get('sessions')
    @ApiConsumes("application/json")
    @ApiOperation({ summary: 'List all chat sessions' })
    @ApiResponse({ status: 200, description: 'List of sessions returned' })
    listSessions(){
        return this.chatService.listSessions()
    }

    @Get(":sessionId")
    @ApiConsumes("application/json")
    @ApiOperation({ summary: 'Get full message history of a session' })
    @ApiResponse({ status: 200, description: 'Session history returned' })
    @ApiResponse({ status: 404, description: 'Session not found' })
    async getHistory(@Param('sessionId') sessionId:string){
    return await this.chatService.GetHistory(sessionId)
    }

    @Delete(":sessionId")
    @ApiConsumes("application/json")
    @ApiOperation({ summary: 'Delete a chat session' })
    @ApiResponse({ status: 200, description: 'Session deleted successfully' })
    @ApiResponse({ status: 404, description: 'Session not found' })
    async deleteSession(@Param("sessionId") sessionId:string){
      return await this.chatService.deleteSession(sessionId)
    }
}
