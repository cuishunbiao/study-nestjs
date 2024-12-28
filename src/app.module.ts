import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './views/auth/auth.module';
import { ArticlesModule } from './views/articles/articles.module';
import { CompanyModule } from './views/company/company.module';
import { ContactModule } from './views/contact/contact.module';
import { FormsModule } from './views/forms/forms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
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
