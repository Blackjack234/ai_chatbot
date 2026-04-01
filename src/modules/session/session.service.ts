import { Injectable } from '@nestjs/common';
import { SessionRepository } from './repositories/session.repository';
import { SessionDocument } from './schemas/session.schema';
import { v4 as uuidv4 } from 'uuid';
import { CreateSessionDto } from './dtos/session.dto';
import { Session } from 'inspector';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { timestamp } from 'rxjs';

@Injectable()
export class SessionService {
    constructor(private readonly sessionRepository: SessionRepository, @InjectModel(Session.name) private readonly sessionModel: Model<SessionDocument>) { }


    async createSession(firstMessage: string,title?:string): Promise<SessionDocument> {
        const session = new this.sessionModel({
            sessionId: uuidv4(),
            title: title ?? firstMessage.slice(0, 50),
            messages: []
        })
        return await session.save()
    }

    async getSession(sessionId: string): Promise<SessionDocument | null> {
        return this.sessionModel.findOne({ sessionId });
    }

    async addMessage(sessionId: string, role: string, content: string) {
        return this.sessionModel.findOneAndUpdate(
            { sessionId },
            {  
                
                $push: { messages: { role, content, timestamp: new Date() } },
                $inc: {
                    messageCount:1,
                    totalCharacters:content.length
                }
        
            },
            { returnDocument:"after" }
        )
    }

    async listSessions(){
        return this.sessionModel.find({},{sessionId:1,title:1,createdAt:1});
    }

    async deleteSession(sessionId:string){
      return this.sessionModel.findOneAndDelete({sessionId})
    }
}
