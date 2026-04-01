import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export enum Personality {
    PROFESSIONAL = 'professional',
    FRIENDLY = 'friendly',
    CONCISE = 'concise'
}

export class SendMessageDto {
    @ApiProperty({
        required: false,
        description: 'Existing session ID. Leave empty to start a new chat.',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    })
    @IsOptional()
    @IsString()
    sessionId?: string; // if not provided, a new session is created


    @ApiProperty({
        description: 'The message to send to the AI',
        example: 'Hello! My name is Rahul.',
    })
    @IsString()
    message: string;

    @ApiProperty({
        required: false,
        enum: Personality,
        default: Personality.FRIENDLY,
        description: 'AI personality mode',
    })
    @IsOptional()
    @IsEnum(Personality)
    personality?: Personality;
}