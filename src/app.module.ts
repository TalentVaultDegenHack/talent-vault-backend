import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './config/app-config.service';
import { entities } from './database/entities';
import { migrations } from './database/migrations';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SkillsModule } from './skills/skills.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),

    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => {
        const options = config.database;
        return {
          type: 'postgres',
          host: options.host,
          port: options.port,
          username: options.username,
          password: options.password,
          database: options.database,
          migrationsRun: options.migrationsRun,
          logging: options.logging,
          entities,
          migrations,
        };
      },
    }),
    AuthModule,
    UserModule,
    SkillsModule,
    BlockchainModule,
  ],
})
export class AppModule {}
