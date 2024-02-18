import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './infrastructure/entities/skill.entity';
import { SkillsController } from './app/controllers/skills.controller';
import { UserModule } from '../user/user.module';
import { ApplicationController } from './app/controllers/application.controller';
import { SkillUserEntity } from './infrastructure/entities/skill-user.entity';
import { SkillsUserService } from './infrastructure/services/skills-user.service';
import { SearchView } from './infrastructure/views/Search.view';
import { MatchingController } from './app/controllers/matching.controller';
import { TokenEntity } from '../blockchain/entities/token.entity';

export const skillsEntities = [SkillEntity, SkillUserEntity, SearchView];

@Module({
  imports: [
    TypeOrmModule.forFeature([...skillsEntities, TokenEntity]),
    UserModule,
  ],
  providers: [SkillsUserService],
  exports: [],
  controllers: [SkillsController, ApplicationController, MatchingController],
})
export class SkillsModule {}
