import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1698735459479 implements MigrationInterface {
  name = 'Init1698735459479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`databases\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`db_name\` varchar(500) NOT NULL,
                \`host\` varchar(255) NOT NULL,
                \`port\` int NOT NULL,
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`databases\`
        `);
  }
}
