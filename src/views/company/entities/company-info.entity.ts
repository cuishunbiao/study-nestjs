import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CompanyInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { comment: '关于我们页面的富文本内容' })
  about: string;

  @Column('text', { comment: '联系我们页面的富文本内容' })
  contact: string;

  @CreateDateColumn()
  created_time: Date;

  @UpdateDateColumn()
  updated_time: Date;
} 