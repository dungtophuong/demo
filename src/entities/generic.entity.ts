import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
export abstract class GenericEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id = 0;
}
