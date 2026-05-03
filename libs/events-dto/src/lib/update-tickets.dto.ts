import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNotEmpty, Max, Min} from "class-validator";

export class UpdateTicketsDto {
    @ApiProperty({ name: 'tickets_amount', description: 'Amount of tickets', example: 15, minimum: 1, maximum: 10000, required: true })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(10000)
    tickets_amount: number;
}