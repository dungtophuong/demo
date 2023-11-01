import { InjectDataSource } from '@nestjs/typeorm';
import { GenericEntity } from '../entities/generic.entity';
import {
  DataSource,
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Constant } from '../helper/constant';
import { DatabaseProvider } from 'src/database/database.provider';
import { Product } from 'src/entities/product.entity';

export abstract class GenericRepository<E extends GenericEntity> {
  /**
   * TypeORM repository to handle the database actions
   */
  protected repository: Repository<E>;
  // protected entity: EntityTarget<E> = EntityTarget<E>;

  /**
   * TypeOR entity manager to handle database query actions
   */
  protected entityManager: EntityManager;

  protected repositories: [] = [];
  protected entityManagers: [] = [];

  constructor(
    @InjectDataSource() protected xDs: DataSource,
    private readonly databaseProvider: DatabaseProvider,
  ) {
    // /** Get repository with datasource from typeorm */
    // this.repository = xDs.getRepository(this.getEntityType());
    // /** Get entity manager with datasource from typeorm */
    // this.entityManager = xDs.manager;
    this.getAllConnect();
  }

  async getAllConnect() {
    Object.keys(this.databaseProvider.dataSources).forEach((key) => {
      this.repositories[key] = this.databaseProvider
        .getDataSoruceByDbName(key)
        .getRepository(Product);
      this.entityManagers[key] =
        this.databaseProvider.getDataSoruceByDbName(key).manager;
    });
  }

  changeRepository(dbName: string) {
    this.repository = this.repositories[dbName];
    this.entityManager = this.entityManager[dbName];
  }
  /**
   * Verify database has entity or not
   * @param entity E
   * @returns
   */
  hasEntity(entity: E): boolean {
    let yes = false;
    if (this.repository != undefined) {
      yes = this.repository.hasId(entity);
    }
    return yes;
  }

  /**
   * Find entity by id
   * @param id number
   * @returns Entity
   */
  async findById(id: number, relations?: string[]): Promise<E> | undefined {
    if (this.repository != undefined) {
      return await this.repository
        .findOne({ where: { id }, relations } as FindOneOptions<E>)
        .then((res: any) => {
          if (res == null) {
            return undefined;
          }
          return res;
        })
        .catch((err: any) => err);
    }
    return undefined;
  }

  /**
   * Find entities by ids
   * @param ids number array
   * @returns Entities
   */
  async findByIds(ids: number[]): Promise<E[]> {
    return await this.repository.find({
      where: { id: In(ids) } as FindOptionsWhere<E>,
    });
  }

  /**
   * Find one item by any field
   * @param fieldName any (string, datetime, ...)
   * @returns Entity
   */
  async findOneByFieldName(
    fieldName: any,
    relations?: string[],
  ): Promise<E> | undefined {
    if (this.repository != undefined) {
      return this.repository
        .findOne({
          where: { ...fieldName },
          relations,
        })
        .then((res: any) => {
          if (res == null) {
            return undefined;
          }
          return res;
        })
        .catch((err: any) => err);
    }
    return undefined;
  }

  /**
   * Save item to database
   * @param entity E
   * @returns Entity
   */
  async save(entity?: E): Promise<E> {
    return this.repository.save(entity);
  }

  /**
   * Update item to database
   * @param entity E
   * @returns Entity
   */
  async update(
    criteria: any,
    partialEntity: QueryDeepPartialEntity<E>,
  ): Promise<UpdateResult> {
    return this.repository.update(criteria, partialEntity);
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
      return this.repository.find({ relations, where, order });
    }
    return undefined;
  }

  /**
   * Find items by Page
   */
  findAndCount(
    relations?: string[],
    where?: any,
    pagination: { take: number; page: number } = {
      take: Number(process.env.LIMITED_ITEM_DISPLAY!),
      page: Constant.PAGE,
    },
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
      const resultValue = this.repository
        .findAndCount({
          relations,
          where,
          take: pagination.take,
          skip: (pagination.page - 1) * pagination.take,
          order,
        })
        .then(([value, count]) => {
          return {
            list: value,
            count,
            page: pagination.take,
            pageSize: pagination.page,
          };
        })
        .catch((err) => err);
      if (!resultValue) return undefined;
      return resultValue;
    }
    return undefined;
  }

  /**
   * Find one item by field ID
   */
  findOneById(id: number): Promise<E> | undefined {
    if (this.repository != undefined) {
      return this.repository
        .findOne({ where: { id } } as FindOneOptions<E>)
        .then((res) => {
          if (res == null) {
            return undefined;
          }
          return res;
        })
        .catch((err) => err);
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
   * Count records
   */
  countBy(
    where?: FindOptionsWhere<E> | FindOptionsWhere<E>[],
  ): Promise<number> {
    if (this.repository != undefined) {
      const resultValue = this.repository
        .countBy(where)
        .then((count) => {
          return count;
        })
        .catch((err: any) => err);
      if (!resultValue) return undefined;
      return resultValue;
    }
    return undefined;
  }

  /**
   * Save many entites
   */
  saveMulti(entities: E[]): Promise<E[]> | undefined {
    if (this.repository != undefined && entities) {
      return this.repository.save(entities);
    }
    return undefined;
  }

  /**
   * Delete item
   */
  delete(id: number): Promise<boolean> {
    if (this.repository != undefined) {
      const retValue = this.repository
        .delete(id)
        .then((v) => {
          if (v.affected == null || v.affected == undefined) return undefined;
        })
        .catch(() => this.repository?.delete(id));
      if (retValue != undefined) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  }

  /**
   * Delete item by field
   */
  deleteBy(fieldName: any): Promise<boolean> {
    if (this.repository != undefined) {
      const retValue = this.repository
        .delete(fieldName)
        .then((v) => {
          if (v.affected == null || v.affected == undefined) return undefined;
        })
        .catch(() => this.repository?.delete(fieldName));
      if (retValue != undefined) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  }

  abstract getEntityType(): EntityTarget<E>;
}
