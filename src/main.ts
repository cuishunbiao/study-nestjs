import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { DataSource } from 'typeorm';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import {TransformInterceptor} from './common/interceptors/transform.interceptors';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger({
        transports: [
          new DailyRotateFile({
            dirname: 'logs',
            filename: 'info-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.SSS'
              }),
              winston.format.json()
            )
          }),
          new DailyRotateFile({
            dirname: 'logs',
            filename: 'error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.SSS'
              }),
              winston.format.json()
            )
          }),
        ],
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        )
      }),
    });

    // 全局注入拦截器
    app.useGlobalInterceptors(new TransformInterceptor())
    // 获取数据源但不重新初始化
    const dataSource = app.get(DataSource);

    // 监听连接状态
    dataSource.isInitialized
      ? console.log('Database connected successfully!')
      : console.log('Database connection not initialized');
      
    // 全局注入数据库配置文件
    const configService = app.get(ConfigService);
    await app.listen(configService.get('PORT') ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}
bootstrap();
