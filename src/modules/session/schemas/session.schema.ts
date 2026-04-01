import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type SessionDocument = HydratedDocument<Message>
export class Message {
    @Prop({ required: true })
    role: string;

    @Prop({ required: true })
    content: string;


    @Prop({ default: Date.now })

    timestamp: Date;
}

@Schema({ versionKey: false, timestamps: true })

export class Session {
    @Prop({ required: true, unique: true })
    sessionId: string;

    @Prop({ default: 'New Chat' })
    title: string;

    @Prop({ type: [{ role: String, content: String, timestamp: Date }], default: [] })
    messages: Message[];


    @Prop({ default: 0 })
    messageCount: number;       // ← new

    @Prop({ default: 0 })
    totalCharacters: number;
}

export const SessionSchema = SchemaFactory.createForClass(Session)
