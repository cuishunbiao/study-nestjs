import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './views/auth/auth.module';
import { ArticlesModule } from './views/articles/articles.module';
import { CompanyModule } from './views/company/company.module';
import { ContactModule } from './views/contact/contact.module';
import { FormsModule } from './views/forms/forms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [databaseConfig], // 加载数据库配置
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ArticlesModule,
    CompanyModule,
    ContactModule,
    FormsModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
