import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillEntity } from '../../infrastructure/entities/skill.entity';
import { SkillDto } from '../models/skill.dto';
import { UsersService } from '../../../user/app/services/users.service';
import { UserRoleEnum } from '../../../user/infrastructure/models/user-role.enum';
import { MentorDto } from '../../../user/app/models/mentor.dto';
import { SkillUserEntity } from '../../infrastructure/entities/skill-user.entity';
import { SkillsUserService } from '../../infrastructure/services/skills-user.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../../../auth/authenticated.request';
import { SkillApplicationInputDto } from '../models/input/skill-application.input.dto';
import { SkillUserDto } from '../models/skill-user.dto';
import {SearchView} from "../../infrastructure/views/Search.view";

@Controller('skills')
export class SkillsController {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly _repo: Repository<SkillEntity>,
    private readonly _userService: UsersService,
    private _skillsUserService: SkillsUserService,
    @InjectRepository(SearchView)
    private readonly _search: Repository<SearchView>,
  ) {}

  @Get('my/summary')
  @UseGuards(JwtAuthGuard)
  public async skillsSummary(@Req() req: AuthenticatedRequest) {
    const result = await this._search.find({
      where: {
        userId: req.user.id
      },
    });

    return result;
  }

  @Get('')
  public async skills() {
    return (await this._repo.find({ order: { name: 'asc' } })).map((o) =>
      SkillDto.map(o),
    );
  }

  @Get('mentors')
  public async mentors() {
    return (await this._userService.findByRole(UserRoleEnum.Mentor)).map((o) =>
      MentorDto.map(o),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  public async my(@Req() req: AuthenticatedRequest) {
    const result = await this._skillsUserService.findByUserId(req.user.id);

    return await Promise.all(
      result.map(async (i) => await SkillUserDto.map(i)),
    );
  }

  @Post('application/send')
  @UseGuards(JwtAuthGuard)
  public async sendApplication(
    @Body() body: SkillApplicationInputDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const object = SkillUserEntity.factory({
      mentorId: body.mentorId,
      skillId: body.skill.id,
      requestedValue: body.skill.requestedValue,
      userId: req.user.id,
    });

    return await this._skillsUserService.save(object);
  }
}
