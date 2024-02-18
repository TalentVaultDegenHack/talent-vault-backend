import { AppConfigService, configValidationSchema } from './app-config.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(process.cwd(), '.env'),
      validationSchema: configValidationSchema(),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
