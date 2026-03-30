import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SessionModule } from '../session/session.module';
import { GeminiModule } from '../gemini/gemini.module';

@Module({
  imports:[SessionModule,GeminiModule],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
