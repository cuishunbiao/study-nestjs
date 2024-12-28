import { registerAs } from '@nestjs/config';
import { DataSourceOptions, DataSource } from 'typeorm';
import * as path from 'path';

export const databaseConfig = registerAs('database', () => ({
  type: 'mysql' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
}));

export const getTypeOrmConfig = (): DataSourceOptions => ({
  ...databaseConfig(),
});

export default new DataSource(getTypeOrmConfig());