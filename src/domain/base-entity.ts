import { IBaseEntity } from './interfaces/interfaces';

export abstract class BaseEntity implements IBaseEntity {
    public created: Date;
    public deleted: Date;
    public id: string;
    public updated: Date;

    protected constructor(data: IBaseEntity) {
        this.id = data.id;
        this.created = data.created;
        this.deleted = data.deleted;
        this.updated = data.updated;
    }
}