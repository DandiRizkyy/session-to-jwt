import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProduct{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({default:'Example Title'})
    title: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({default:'Example Description'})
    description: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({default:'Example Category'})
    category: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({default: 1})
    userId: number
}