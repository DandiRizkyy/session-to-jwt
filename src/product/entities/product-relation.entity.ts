import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@prisma/client";
import { UserEntity } from "src/user/entities/user.entity";

export class ProductRelationEntity implements Product{
    @ApiProperty({default: 1})
    id: number;

    @ApiProperty({default: "Example Title"})
    title: string;

    @ApiProperty({default: "Example Description"})
    description: string;

    @ApiProperty({default: "Example Category"})
    category: string;

    @ApiProperty({default: 1})
    userId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    // add relation to user entity
    @ApiProperty({required: false, type: UserEntity})
    user?: UserEntity;

    }
