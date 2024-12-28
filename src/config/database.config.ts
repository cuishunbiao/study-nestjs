import { registerAs } from '@nestjs/config';
import { DataSourceOptions, DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

// 确保加载环境变量
dotenv.config();

// 添加调试日志
console.log('Database Configuration:', {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  // 不要打印密码
});

export const databaseConfig = registerAs('database', () => ({
  type: 'mysql' as const,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  driver: require('mysql2')
}));

// 为 TypeORM CLI 创建一个配置对象
const dataSourceOptions: DataSourceOptions = {
  ...databaseConfig(),
  type: 'mysql',
};

// 为 NestJS 导出配置
export const getTypeOrmConfig = (): DataSourceOptions => dataSourceOptions;

// 为 TypeORM CLI 导出 DataSource 实例
export default new DataSource(dataSourceOptions);