import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class PatchProduct{
    @IsString()
    @IsOptional()
    @ApiProperty({required: false, default: 'Example Title'})
    title: string

    @IsString()
    @IsOptional()
    @ApiProperty({required: false, default: 'Example Description'})
    description: string

    @IsString()
    @IsOptional()
    @ApiProperty({required: false, default: 'Example Category'})
    category: string

    @IsNumber()
    @IsOptional()
    @ApiProperty({required: false, default: 1})
    userId: number
}