import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Strategy } from "passport-local";
import { AuthenticationService } from "./authentication.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private readonly authenticationService: AuthenticationService){
        super({
            usernameField: 'email',
        });
    }
    
    async validate(email: string, password:string): Promise<User> {
        const user =  await this.authenticationService.validateUser(email, password);
        if (!user){
            throw new UnauthorizedException();  
        }
        return user;
    }
}