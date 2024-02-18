import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../infrastructure/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
import assert from 'node:assert';
import { UserRoleEnum } from '../../infrastructure/models/user-role.enum';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly _repo: Repository<UserEntity>,
  ) {}

  public async findByEmail(email: string) {
    assert(email, 'Email is required');
    return await this._repo.findOneBy({
      email,
    });
  }

  public async findByUsername(username: string) {
    assert(username, 'Username is required');
    return await this._repo.findOneBy({
      username,
    });
  }

  public async findById(id: string) {
    assert(id, 'Id is required');
    return await this._repo.findOneOrFail({ where: { id } });
  }

  public async findByRole(role: UserRoleEnum) {
    return await this._repo.findBy({
      roles: ArrayContains([role]),
    });
  }

  public async save(user: UserEntity) {
    return await this._repo.save(user);
  }
}
