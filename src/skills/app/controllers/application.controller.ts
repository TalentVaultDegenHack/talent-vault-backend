import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SkillsUserService } from '../../infrastructure/services/skills-user.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { SkillUserStateEnum } from '../../infrastructure/models/skill-user-state.enum';
import { SkillApplicationDto } from '../models/skill-application.dto';
import { AuthenticatedRequest } from '../../../auth/authenticated.request';
import { UserRoleEnum } from '../../../user/infrastructure/models/user-role.enum';
import { RoleGuard } from '../../../auth/role.guard';
import { SkillApproveInputDto } from '../models/input/skill-approve.input.dto';
import { TokenEntity } from '../../../blockchain/entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('skills/application')
@UseGuards(JwtAuthGuard)
export class ApplicationController {
  constructor(
    private _skillsUserService: SkillsUserService,
    @InjectRepository(TokenEntity)
    private readonly _tokenRepo: Repository<TokenEntity>,
  ) {}

  @Get('pending')
  @UseGuards(RoleGuard(UserRoleEnum.Mentor))
  public async pending(@Req() req: AuthenticatedRequest) {
    const res = await this._skillsUserService.findByStateAndMentorId(
      SkillUserStateEnum.Pending,
      req.user.id,
    );

    return await Promise.all(
      res.map(async (i) => await SkillApplicationDto.map(i)),
    );
  }

  @Get(':id')
  @UseGuards(RoleGuard(UserRoleEnum.Mentor))
  public async get(@Req() req: AuthenticatedRequest, @Param() params: any) {
    const res = await this._skillsUserService.findByStateAndMentorId(
        SkillUserStateEnum.Pending,
        req.user.id,
    );
    return await SkillApplicationDto.map(res.find(i => i.id === Number(params.id)));
  }

  @Get('')
  @UseGuards(RoleGuard(UserRoleEnum.Mentor))
  public async all(@Req() req: AuthenticatedRequest) {
    const res = await this._skillsUserService.findByMentorId(req.user.id);

    return await Promise.all(
      res.map(async (i) => await SkillApplicationDto.map(i)),
    );
  }

  @Put(':id/approve')
  @UseGuards(RoleGuard(UserRoleEnum.Mentor))
  public async approve(
    @Param() params: any,
    @Req() req: AuthenticatedRequest,
    @Body() body: SkillApproveInputDto,
  ) {
    const object = await this._skillsUserService.findById(params.id);

    if (
      object &&
      object.mentorId === req.user.id &&
      object.confirmedAt === null
    ) {
      object.confirmedAt = new Date();
      object.state = SkillUserStateEnum.Approved;
      object.value = body.value;
      object.mentorCooperation = body.mentorCooperation;
      object.mentorValue = body.mentorValue;
      const res = await this._skillsUserService.save(object);

      const token = new TokenEntity();
      token.skillUserId = res.id;
      await this._tokenRepo.save(token);
    } else {
      // TODO Error reporting
    }
  }

  @Put(':id/decline')
  @UseGuards(RoleGuard(UserRoleEnum.Mentor))
  public async decline(@Param() params: any, @Req() req) {
    const object = await this._skillsUserService.findById(params.id);

    if (
      object &&
      object.mentorId === req.user.id &&
      object.confirmedAt === null
    ) {
      object.confirmedAt = new Date();
      object.state = SkillUserStateEnum.Declined;
      await this._skillsUserService.save(object);
    } else {
      // TODO Error reporting
    }
  }
}
