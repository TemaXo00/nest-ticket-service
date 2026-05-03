import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CancelTicketDto {
    @ApiProperty({name: 'user_id', description: 'User ID', example: 'john-doe' })
    @IsNotEmpty()
    @IsString()
    user_id: string;
}