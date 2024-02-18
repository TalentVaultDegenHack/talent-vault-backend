import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './input/register.dto';
import { UsersService } from '../user/app/services/users.service';
import { UserDto } from '../user/app/models/user.dto';
import { ErrorResponse } from '../app/error-response';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }

  @Post('register')
  async register(@Body() object: RegisterDto, @Res() res: Response) {
    const objEmail = await this._userService.findByEmail(object.email);
    const objUsername = await this._userService.findByUsername(object.username);

    if (objEmail) {
      return res.status(400).json(<ErrorResponse>{
        id: 'emailAddressRegistered',
      });
    }
    if (objUsername) {
      return res.status(400).json(<ErrorResponse>{
        id: 'usernameIsAlreadyInUse',
      });
    }
    if (object.address) {
      res.json(
          UserDto.map(
              await this._authService.register(
                  object.username,
                  object.email,
                  object.password,
                  object.address,
                  object.firstName,
                  object.lastName,
              ),
          ),
      );
    } else {
      res.json(
          UserDto.map(
              await this._authService.register(
                  object.username,
                  object.email,
                  object.password,
                  "",
                  object.firstName,
                  object.lastName,
              ),
          ),
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<UserDto> {
    return UserDto.map(await this._userService.findById(req.user.id));
  }
}
