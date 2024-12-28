import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyInfo } from './entities/company-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyInfo])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
