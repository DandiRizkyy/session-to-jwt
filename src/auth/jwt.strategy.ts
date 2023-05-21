import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
      ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET,
        });
      }
    
      async validate(payload: any) {
        const user = await this.prismaService.user.findUnique({
          where: { id: payload.userId },
        });
    
        if (!user) {
          throw new NotFoundException(`User not found.`);
        }
    
        return user;
      }
    
}