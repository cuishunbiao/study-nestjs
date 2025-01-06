import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1735401886329 implements MigrationInterface {
    name = 'AutoMigration1735401886329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_info\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`company_info\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`company_info\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`company_info\` ADD \`about\` text NOT NULL COMMENT '关于我们页面的富文本内容'`);
        await queryRunner.query(`ALTER TABLE \`company_info\` ADD \`contact\` text NOT NULL COMMENT '联系我们页面的富文本内容'`);
        await queryRunner.query(`ALTER TABLE \`company_info\` ADD \`created_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`company_info\` ADD \`updated_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_info\` DROP COLUMN \`updated_time\``);
        await queryRunner.query(`ALTER TABLE \`company_info\` DROP COLUMN \`created_time\``);
        await queryRunner.query(`ALTER TABLE \`company_info\` DROP COLUMN \`contact\``);
        await queryRunner.query(`ALTER TABLE \`company_info\` DROP COLUMN \`about\``);
        await queryRunner.query(`ALTER TABLE \`company_info\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`company_info\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`company_info\` ADD \`content\` text NOT NULL`);
    }

}
