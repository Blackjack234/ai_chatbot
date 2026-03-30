import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Session, SessionDocument } from "../schemas/session.schema";
import { Model } from "mongoose";
import { CreateSessionDto } from "../dtos/session.dto";

@Injectable()

export class SessionRepository{

    constructor(@InjectModel(Session.name) private readonly sessionModel:Model<Session>){}


    async createSession(session: CreateSessionDto):Promise<Session>{
      const result = await this.sessionModel.create(session);
      return result
    }
}