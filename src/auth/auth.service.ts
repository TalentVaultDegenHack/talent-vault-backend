import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/app/services/users.service';
import { UserEntity } from '../user/infrastructure/entities/user.entity';
import argon2 from 'argon2';
import assert from 'node:assert';
import { UserDto } from '../user/app/models/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private _jwtService: JwtService,
    private _userService: UsersService,
  ) {}

  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this._userService.findByUsername(username);

    if (user && (await this.verifyPassword(pass, user.getPasswordHash()))) {
      return user;
    } else {
      return null;
    }
  }

  public async hashPassword(password: string) {
    assert(password, 'Password is required');

    return await argon2.hash(password);
  }

  public async verifyPassword(password: string, hash: string) {
    assert(password, 'Password is required');
    assert(hash, 'Hash is required');

    return await argon2.verify(hash, password);
  }

  public async login(user: UserEntity) {
    const payload = { ...UserDto.map(user) };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }

  public async register(username: string, email: string, password: string, blockchainAddress: string = null, firstName?: string, lastName?: string) {
    const user = UserEntity.factory({
      username: username,
      email: email,
      passwordHash: await this.hashPassword(password),
    });
    if (blockchainAddress) {
      user.blockchainAddress = blockchainAddress;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (firstName) {
      user.firstName = firstName;
    }

    return this._userService.save(user);
  }
}
