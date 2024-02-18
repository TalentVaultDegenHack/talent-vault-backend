import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const KEYS = {
  NODE_ENV: 'NODE_ENV',
  PASSPORT_SECRET: 'PASSPORT_SECRET',
  PORT: 'PORT',
  TYPEORM_HOST: 'TYPEORM_HOST',
  TYPEORM_PORT: 'TYPEORM_PORT',
  TYPEORM_USERNAME: 'TYPEORM_USERNAME',
  TYPEORM_PASSWORD: 'TYPEORM_PASSWORD',
  TYPEORM_DATABASE: 'TYPEORM_DATABASE',
  TYPEORM_LOGGING: 'TYPEORM_LOGGING',
  TEZOS_URL: 'TEZOS_URL',
  TEZOS_PRIVATE_KEY: 'TEZOS_PRIVATE_KEY',
  TEZOS_TREASURY: 'TEZOS_TREASURY',
  TEZOS_CONTRACT_ADDRESS: 'TEZOS_CONTRACT_ADDRESS',
  FRONTEND: 'FRONTEND',
};

export const configValidationSchema = () => {
  return Joi.object<typeof KEYS>({
    PORT: Joi.number().port().default(3000),
    PASSPORT_SECRET: Joi.string().required(),
    TYPEORM_HOST: Joi.string().required(),
    TYPEORM_PORT: Joi.number().port().required(),
    TYPEORM_USERNAME: Joi.string().required(),
    TYPEORM_PASSWORD: Joi.string().required(),
    TYPEORM_DATABASE: Joi.string().required(),
    TYPEORM_LOGGING: Joi.string()
      .valid('true', 'false', 'query')
      .default(false),
    TEZOS_URL: Joi.string().required(),
    TEZOS_PRIVATE_KEY: Joi.string().required(),
    TEZOS_TREASURY: Joi.string().required(),
    TEZOS_CONTRACT_ADDRESS: Joi.string().required(),
    FRONTEND: Joi.string().required(),
  });
};

@Injectable()
export class AppConfigService {
  constructor(private readonly _config: ConfigService) {}

  get port() {
    return this._config.get<number>(KEYS.PORT)!;
  }

  get passportSecret() {
    return this._config.get<string>(KEYS.PASSPORT_SECRET);
  }

  get frontend() {
    return this._config.get<string>(KEYS.FRONTEND);
  }

  get database() {
    return {
      host: this._config.get<string>(KEYS.TYPEORM_HOST)!,
      port: this._config.get<number>(KEYS.TYPEORM_PORT)!,
      username: this._config.get<string>(KEYS.TYPEORM_USERNAME)!,
      password: this._config.get<string>(KEYS.TYPEORM_PASSWORD)!,
      database: this._config.get<string>(KEYS.TYPEORM_DATABASE)!,
      migrationsRun: false,
      logging: false,
    };
  }

  get tezos() {
    return {
      url: this._config.get<string>(KEYS.TEZOS_URL),
      privateKey: this._config.get<string>(KEYS.TEZOS_PRIVATE_KEY),
      treasury: this._config.get<string>(KEYS.TEZOS_TREASURY),
      contractAddress: this._config.get<string>(KEYS.TEZOS_CONTRACT_ADDRESS),
    };
  }
}
