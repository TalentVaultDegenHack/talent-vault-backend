import { Module } from '@nestjs/common';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UsersService } from './app/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

export const userEntities = [UserEntity];

@Module({
  imports: [TypeOrmModule.forFeature([...userEntities])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
