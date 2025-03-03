import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role, RolePermission, User } from './entities';
import { UsersModule } from './users/user.module';
import { UsersController } from './users/users.controller';
import { UserService } from './users/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'C:\\Database\\gubbies.db',
      entities: [User, Role, Permission, RolePermission],
      synchronize: false,
      autoLoadEntities: true,
    }),
    UsersModule,
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class AppModule {}
