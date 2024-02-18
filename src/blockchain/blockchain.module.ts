import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TokenEntity } from './entities/token.entity';
import { BlockchainService } from './services/blockchain.service';
import { BlockchainTaskService } from './services/blockchain-task.service';
import { AppConfigModule } from '../config/app-config.module';
import { SkillUserEntity } from '../skills/infrastructure/entities/skill-user.entity';

export const blockchainEntities = [TokenEntity];

@Module({
  imports: [
    TypeOrmModule.forFeature([...blockchainEntities, SkillUserEntity]),
    UserModule,
    AppConfigModule,
  ],
  providers: [BlockchainService, BlockchainTaskService],
  exports: [BlockchainService, BlockchainTaskService],
  controllers: [],
})
export class BlockchainModule {}
