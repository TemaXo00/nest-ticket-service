import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, Length} from "class-validator";

export class UpdateNameDto {
    @ApiProperty({name: 'name', description: 'New name of event', minimum: 3, maximum: 128, example: 'The Weeknd Concert', required: true})
    @IsNotEmpty()
    @IsString()
    @Length(3, 128)
    name: string
}