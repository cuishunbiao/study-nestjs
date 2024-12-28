import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCompanyInfoDto {
  @IsString()
  @IsNotEmpty()
  content: string;
} 