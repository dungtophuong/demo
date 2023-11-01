import { GenericEntity } from '../entities/generic.entity';
import { GenericRepository } from '../repository/generic.repository';

export abstract class GenericService<
  E extends GenericEntity,
  R extends GenericRepository<E>,
> {
  protected repository: R;

  protected where: any = {};
  protected order: any = {};

  /**
   * Constructor
   * @param r Repository from derived class
   */
  constructor(protected r: R) {
    this.repository = r;
  }
  /**
   * Check entity exists or not
   * @param entity E
   * @returns true / false
   */
  hasEntity(entity: E): boolean {
    return this.repository.hasEntity(entity);
  }

  /**
   * Find entity by id
   * @param id number
   * @returns Entity
   */

  findById(id: number, relations?: string[]): Promise<E> | undefined {
    if (this.repository != undefined) {
      return this.repository.findById(id, relations);
    }
    return undefined;
  }
  /**
   * Find entities by ids
   * @param ids number array
   * @returns Entities
   */
  async findByIds(ids: number[]): Promise<E[]> {
    return await this.repository.findByIds(ids);
  }

  /**
   * Find one item by any field
   * @param fieldName any (string, datetime, ...)
   * @returns Entity
   */
  async findOneByFieldName(fieldName: any): Promise<E> {
    return await this.repository.findOneByFieldName(fieldName);
  }

  /**
   * Save item
   * @param entity E
   * @returns Entity
   */
  save(entity: E): Promise<E> {
    return this.repository.save(entity);
  }

  /**
   * Logger to log information
   */
  // get logger() {
  //   const logger = XApp.get().get(XloggerService);
  //   return logger;
  // }

  create(): E | undefined {
    if (this.repository != undefined) {
      return this.repository.create();
    }
    return undefined;
  }
  /**
   * Find all items
   */
  findAll(
    relations?: string[],
    where?: any,
    order?: any,
  ): Promise<E[]> | undefined {
    if (this.repository != undefined) {
      return this.repository.findAll(relations, where, order);
    }
  }

  /**
   * Find items by Page
   */
  findAndCount(
    relations?: string[],
    where?: any,
    pagination?: { take: number; page: number },
    order?: any,
  ):
    | Promise<{
        list: E[];
        count: number;
        page: number;
        pageSize: number;
      }>
    | undefined {
    if (this.repository != undefined) {
      return this.repository.findAndCount(relations, where, pagination, order);
    }
  }

  /**
   * Find one item by field ID
   */
  findOneById(id: number): Promise<E> | undefined {
    if (this.repository != undefined) {
      return this.repository.findOneById(id);
    }
    return undefined;
  }

  /**
   * Count records
   */
  count(): Promise<number> {
    if (this.repository != undefined) {
      return this.repository.count();
    }
    return Promise.resolve(0);
  }

  /**
   * Save many entites
   */
  saveMulti(entities: E[]): Promise<E[]> | undefined {
    if (this.repository != undefined) {
      return this.repository.saveMulti(entities);
    }
    return undefined;
  }

  /**
   * Delete item
   */
  delete(id: number): Promise<boolean> {
    if (this.repository != undefined) {
      return this.repository.delete(id);
    }
    return Promise.resolve(false);
  }

  /**
   * Delete item by field
   */
  deleteBy(fieldName: any): Promise<boolean> {
    if (this.repository != undefined) {
      this.repository.deleteBy(fieldName);
    }
    return Promise.resolve(false);
  }
}
