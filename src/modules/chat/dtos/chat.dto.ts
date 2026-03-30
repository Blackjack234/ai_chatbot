import { IsOptional, IsString } from "class-validator";

export class SendMessageDto {
    @IsOptional()
    @IsString()
    sessionId?: string; // if not provided, a new session is created

    @IsString()
    message: string;
}