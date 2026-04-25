import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, IsUUID, Length} from "class-validator";

export class EventManipulationsDto {
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
}