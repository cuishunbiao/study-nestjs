import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyInfo } from './entities/company-info.entity';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyInfo)
    private companyInfoRepository: Repository<CompanyInfo>,
  ) {}

  async getCompanyInfo(): Promise<CompanyInfo> {
    const info = await this.companyInfoRepository.findOne({
      where: { id: 1 }, // 假设只有一条公司信息记录
    });

    return info;
  }

  // async updateCompanyInfo(updateCompanyInfoDto: UpdateCompanyInfoDto): Promise<CompanyInfo> {
  //   const info = await this.getCompanyInfo();
  //   info.content = updateCompanyInfoDto.content;
  //   return this.companyInfoRepository.save(info);
  // }
} 