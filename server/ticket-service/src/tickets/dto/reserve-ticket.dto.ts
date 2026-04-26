import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, IsUUID} from "class-validator";

export class ReserveTicketDto {
    @ApiProperty({name: 'event_id', description: 'event_id', example: '2b4adec4-3c30-45fc-8967-37ea807f0982' })
    @IsNotEmpty()
    @IsString()
    @IsUUID(4)
    event_id: string;
    @ApiProperty({name: 'user_id', description: 'User ID', example: 'john-doe' })
    @IsNotEmpty()
    @IsString()
    user_id: string;
}