import { EntitySchemaColumnOptions } from 'typeorm';

export const baseColumnsSchemaPart = {
    id: {
        type: String,
        primary: true,
        generated: true,
        objectId: true
    } as EntitySchemaColumnOptions,
    created: {
        type: Date,
        nullable: true,
        createDate: true
    } as EntitySchemaColumnOptions,
    updated: {
        type: Date,
        nullable: true,
        updateDate: true
    } as EntitySchemaColumnOptions,
    deleted: {
        type: Date,
        nullable: true
    } as EntitySchemaColumnOptions,
};