import { DataSource, DataSourceOptions } from 'typeorm';
import { entities } from './entities';
import { migrations } from './migrations';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5600,
  username: 'hackathon',
  password: 'password',
  database: 'hackathon',
  entities,
  migrations,
} as DataSourceOptions);
