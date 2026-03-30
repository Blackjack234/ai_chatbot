import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class MessageDto{
    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    timestamp?: Date;
}


export class CreateSessionDto {
    @IsString()
    @IsNotEmpty()
    sessionId: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MessageDto)
    messages?: MessageDto[];
}