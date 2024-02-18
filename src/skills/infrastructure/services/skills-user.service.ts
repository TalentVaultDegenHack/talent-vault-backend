import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import assert from 'node:assert';
import { SkillUserEntity } from '../entities/skill-user.entity';
import { SkillUserStateEnum } from '../models/skill-user-state.enum';
import { SearchView } from '../views/Search.view';
import { SkillFilterInterface } from '../../app/models/skill.filter.interface';

@Injectable()
export class SkillsUserService {
  public constructor(
    @InjectRepository(SkillUserEntity)
    private readonly _repo: Repository<SkillUserEntity>,
    @InjectRepository(SearchView)
    private readonly _search: Repository<SearchView>,
  ) {}

  public async matchingProfile(
    minimalPrecision: number,
    filters: SkillFilterInterface[],
  ) {
    const searchResult = await this.findBySkills(filters);

    const result = {} as any;

    for (const key of Object.keys(searchResult)) {
      const percent = Math.ceil((100 / filters.length) * searchResult[key]);
      if (minimalPrecision <= percent) {
        result[key] = percent;
      }
    }

    return result;
  }

  public async matchingProfileCount(filters: SkillFilterInterface[]) {
    const searchResult = await this.findBySkills(filters);

    const r = {
      0: 0,
      5: 0,
      10: 0,
      15: 0,
      20: 0,
      25: 0,
      30: 0,
      35: 0,
      40: 0,
      45: 0,
      50: 0,
      55: 0,
      60: 0,
      65: 0,
      70: 0,
      75: 0,
      80: 0,
      85: 0,
      90: 0,
      95: 0,
      100: 0,
    };

    for (const key of Object.keys(searchResult)) {
      const percent = Math.ceil((100 / filters.length) * searchResult[key]);
      let i = 0;
      while (i <= percent) {
        r[i]++;
        i = i + 5;
      }
    }

    return r;
  }

  public async findBySkillAndUserId(
    filter: SkillFilterInterface,
    userId: string,
  ) {
    return await this._search.find({
      where: {
        medianValue: Between(filter.from, filter.to),
        skillId: filter.skillId,
        userId: userId,
      },
    });
  }

  private async findBySkill(filter: SkillFilterInterface) {
    return await this._search.find({
      where: {
        medianValue: Between(filter.from, filter.to),
        skillId: filter.skillId,
      },
    });
  }

  private async findBySkills(filters: SkillFilterInterface[]) {
    const searchResult = {} as any;

    for (const f of filters) {
      const result = await this.findBySkill(f);

      for (const el of result) {
        if (el.userId in searchResult) {
          searchResult[el.userId]++;
        } else {
          searchResult[el.userId] = 1;
        }
      }
    }

    return searchResult;
  }

  public async findByStateAndMentorId(
    state: SkillUserStateEnum,
    userId: string,
  ) {
    assert(state, 'State is required');
    assert(userId, 'UserId is required');

    return await this._repo.findBy({
      state: state,
      mentorId: userId,
    });
  }

  public async findByMentorId(userId: string) {
    assert(userId, 'UserId is required');

    return await this._repo.findBy({
      mentorId: userId,
    });
  }

  public async findById(id: number) {
    assert(id, 'Id is required');

    return await this._repo.findOneByOrFail({
      id,
    });
  }

  public async findByUserId(userId: string) {
    assert(userId, 'userId is required');

    return await this._repo.findBy({
      userId: userId,
    });
  }

  public async save(user: SkillUserEntity) {
    return await this._repo.save(user);
  }
}
