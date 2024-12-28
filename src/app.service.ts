import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // 方法1：打印数据库配置
    console.log('Database Config:', {
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      database: this.configService.get('database.database'),
      username: this.configService.get('database.username'),
      // 出于安全考虑，不打印密码
    });

    // 方法2：打印当前环境
    console.log('NODE_ENV:', process.env.NODE_ENV);
  }
} 