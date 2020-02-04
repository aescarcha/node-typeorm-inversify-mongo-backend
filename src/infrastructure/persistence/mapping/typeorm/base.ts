import { EntitySchemaColumnOptions } from 'typeorm';

export const baseColumnsSchemaPart = {
    id: {
        type: 'uuid',
        primary: true,
        unique: true,
        generated: 'uuid',
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