export interface IDateable {
    created?: Date;
    updated?: Date;
}

export interface ISoftDeleteable {
    deleted?: Date;
}

export interface IRepository<T> {
    find(params: any): Promise<T[]>;
    findOne(params: any): Promise<T>;
    save(data: T): Promise<T>;
}

export interface IBaseEntity extends ISoftDeleteable, IDateable {
    id: string;
}

export interface IRepository<T> {
    find(params: any): Promise<T[]>;
    findOne(params: any): Promise<T>;
    save(data: T): Promise<T>;
}