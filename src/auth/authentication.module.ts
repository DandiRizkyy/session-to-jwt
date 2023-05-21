import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  imports:[
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '5h'
      }
    })
  ],
  providers: [AuthenticationService, JwtStrategy, PrismaService], 
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
