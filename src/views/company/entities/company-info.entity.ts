import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DateFormat } from '../../../common/decorators/date-format.decorator';

@Entity()
export class CompanyInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  about: string;

  @Column('text')
  contact: string;

  @CreateDateColumn()
  @DateFormat('YYYY-MM-DD')
  created_time: Date;

  @UpdateDateColumn()
  updated_time: Date;
} 