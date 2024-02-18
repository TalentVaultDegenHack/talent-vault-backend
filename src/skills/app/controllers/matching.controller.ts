import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import { SkillsUserService } from '../../infrastructure/services/skills-user.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { MatchingProfilesInputDto } from '../models/input/matching-profiles-input.dto';
import { MatchingProfilesCountInputDto } from '../models/input/matching-profiles-count-input.dto';
import { UsersService } from '../../../user/app/services/users.service';
import { MatchingProfileInputDto } from '../models/input/matching-profile-input.dto';
import { UserPublicDto } from '../../../user/app/models/userPublicDto';
import { SkillUserDto } from '../models/skill-user.dto';

@Controller('matching')
export class MatchingController {
  constructor(
    private _skillsUserService: SkillsUserService,
    private _userService: UsersService,
  ) {}

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  public async matchingProfile(@Body() body: MatchingProfileInputDto) {
    const context = [];
    for (const el of body.filters) {
      context.push(
        await this._skillsUserService.findBySkillAndUserId(el, body.userId),
      );
    }
    const skills = await this._skillsUserService.findByUserId(body.userId);

    return {
      user: UserPublicDto.map(await this._userService.findById(body.userId)),
      context: context,
      skills: await Promise.all(
        skills.map(async (i) => await SkillUserDto.map(i)),
      ),
    };
  }

  @Post('profiles')
  @UseGuards(JwtAuthGuard)
  public async matchingProfiles(@Body() body: MatchingProfilesInputDto) {
    const res = await this._skillsUserService.matchingProfile(
      body.precision,
      body.filters,
    );

    const result = [];

    for (const key of Object.keys(res)) {
      const user = await this._userService.findById(key);
      result.push({
        precision: res[key],
        user: UserPublicDto.map(user),
      });
    }

    return result;
  }

  @Post('profiles-count')
  @UseGuards(JwtAuthGuard)
  public async matchingProfilesCount(
    @Body() body: MatchingProfilesCountInputDto,
  ) {
    return await this._skillsUserService.matchingProfileCount(body.filters);
  }
}
