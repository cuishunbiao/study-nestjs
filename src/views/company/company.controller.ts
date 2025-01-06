import { Controller, Get, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyInfo } from './entities/company-info.entity';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('getInfo')
  getCompanyInfo(): Promise<CompanyInfo> {
    return this.companyService.getCompanyInfo();
  }

  @Post('setInfo')
  updateCompanyInfo(@Body() updateCompanyInfoDto: UpdateCompanyInfoDto): Promise<CompanyInfo> {
    // return this.companyService.updateCompanyInfo(updateCompanyInfoDto);
    return null;
  }
} 