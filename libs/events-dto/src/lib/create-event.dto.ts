import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNotEmpty, IsString, Length, Max, Min} from "class-validator";

export class CreateEventDto {
    @ApiProperty({ name: 'name', description: 'Name of event', example: 'Concert of The Weeknd', minimum: 3, maximum: 128, required: true })
    @IsNotEmpty()
    @IsString()
    @Length(3, 128)
    name: string;
    @ApiProperty({ name: 'tickets_amount', description: 'Amount of tickets', example: 15, minimum: 1, maximum: 10000, required: true })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(10000)
    tickets_amount: number;
}