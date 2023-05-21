import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
constructor(private readonly prismaService: PrismaService){
    super();
}

    async deserializeUser(payload: number, done: Function) {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: payload,
            }
        })

        if(!user){
            done(new Error(`User not found`));
            return;
        }
        done(null, user);
    }

    serializeUser(user: User, done: Function) {
        done(null, user.id);
    }
}