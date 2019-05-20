export interface IDatedObject {
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISoftDeleteObject {
    deletedAt?: Date;
}

export interface IRepository<T> {
    find(params: any): Promise<T[]>;
    findOne(params: any): Promise<T>;
    save(data: T): Promise<T>;
}