import { UserEntity } from '../../infrastructure/entities/user.entity';
import { UserRoleEnum } from '../../infrastructure/models/user-role.enum';

export class UserDto {
  private constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly roles: UserRoleEnum[],
  ) {}

  static map(entity: Readonly<UserEntity>): UserDto {
    return new UserDto(entity.id, entity.username, entity.email, entity.roles);
  }
}
