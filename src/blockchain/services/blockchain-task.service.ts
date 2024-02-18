import { AppConfigService } from '../../config/app-config.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from '../entities/token.entity';
import { Cron } from '@nestjs/schedule';
import { BlockchainService } from './blockchain.service';

@Injectable()
export class BlockchainTaskService {
  private readonly _logger = new Logger(BlockchainTaskService.name);

  public constructor(
    private _configService: AppConfigService,
    @InjectRepository(TokenEntity)
    private readonly _repo: Repository<TokenEntity>,
    private readonly _blockchainService: BlockchainService,
  ) {}

  // @Cron('45 * * * * *')
  public async deployContract() {
    await this._blockchainService.deployContract();
  }

  // @Cron('* 10 * * * *')
  public async mintTokens() {
    const tokens = await this._repo.findBy({ isMinted: false });
    for (const token of tokens) {
      const skillUserEntity = await token.skillUser;
      const skill = await skillUserEntity.skill;
      const user = await skillUserEntity.user;
      const destinationAddr = user.blockchainAddress
        ? user.blockchainAddress
        : this._configService.tezos.treasury;
      // mint tokens

      try {
        const address = await this._blockchainService.createToken(
          destinationAddr,
          skillUserEntity.skillId.toString(),
          skill.name,
          skillUserEntity.mentorValue.toString(),
          skillUserEntity.mentorCooperation.toString(),
          skillUserEntity.value.toString(),
        );

        token.isMinted = true;
        token.mintedAt = new Date();
        token.destinationAddr = destinationAddr;
        token.address = address;
        await this._repo.save(token);
      } catch (error) {
        console.log(error);
        this._logger.error(error);
      }
    }
  }
}

// become robot orchard pencil visual unit comic crunch side toward spawn current
