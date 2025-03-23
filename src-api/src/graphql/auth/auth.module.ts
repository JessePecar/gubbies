import { RepositoryModule, RepositoryService } from "src/repository";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [RepositoryModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7d' }, 
    // TODO: Update this to have a shorter lifespan and have a refresh token returned as well with a longer lifespan
  }),],
  providers: [AuthService, AuthResolver, RepositoryService],
})
export class AuthModule {}