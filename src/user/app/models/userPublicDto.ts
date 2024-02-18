import { UserEntity } from '../../infrastructure/entities/user.entity';

export class UserPublicDto {
  private constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}

  static map(entity: Readonly<UserEntity>): UserPublicDto {
    return new UserPublicDto(
      entity.id,
      entity.username,
      entity.firstName,
      entity.lastName,
    );
  }
}
