import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class UserInput {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    
}