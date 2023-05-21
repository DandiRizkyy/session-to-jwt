import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUser{
    @ApiProperty({default: "example@gmail.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({default: "example123"})
    @IsNotEmpty()
    password: string
}

export class LoginUser{
    @ApiProperty({default: "example@gmail.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({default: "example123"})
    @IsNotEmpty()
    password: string
}