import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNotEmpty, IsString, IsUUID, Max, Min} from "class-validator";

export class UpdateEventTicketsDto {
    @ApiProperty({name: 'id', description: 'ID of event. Gets from event service', example: '763d0e0b-2ed0-49c2-a983-fa046016eb99'})
    @IsNotEmpty()
    @IsString()
    @IsUUID(4)
    id: string
    @ApiProperty({name: 'tickets_amount', description: 'Tickets new amount', example: 30})
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(10000)
    tickets_amount: number;
    @ApiProperty({name: 'prev_amount', description: 'Previous amount of tickets', example: 20})
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(10000)
    prev_amount: number;

}