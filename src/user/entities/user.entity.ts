import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User{
    
    @ApiProperty({default: 1})
    id: number;
    
    @ApiProperty({default: "example@gmail.com"})
    email: string;

  
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;


}