import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNotEmpty, IsString, IsUUID, Length, Max, Min} from "class-validator";

export class CreateEventDto {
    @ApiProperty({name: 'id', description: 'ID of event. Gets from event service', example: '763d0e0b-2ed0-49c2-a983-fa046016eb99'})
    @IsNotEmpty()
    @IsString()
    @IsUUID(4)
    id: string
    @ApiProperty({name: 'name', description: 'Name of event', example: 'Concert of The Weeknd', minimum: 3, maximum: 128})
    @IsNotEmpty()
    @IsString()
    @Length(3, 128)
    name: string
    @ApiProperty({name: 'tickets_left', description: 'Left tickets for reserving', example: 15})
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(10000)
    tickets_left: number;
}