import { EntitySchemaColumnOptions } from 'typeorm';

export const baseColumnsSchemaPart = {
    id: {
        type: 'uuid',
        primary: true,
        generated: 'uuid',
    } as EntitySchemaColumnOptions,
    createdAt: {
        type: Date,
        nullable: true,
        createDate: true
    } as EntitySchemaColumnOptions,
    updatedAt: {
        type: Date,
        nullable: true,
        updateDate: true
    } as EntitySchemaColumnOptions,
    deletedAt: {
        type: Date,
        nullable: true
    } as EntitySchemaColumnOptions,
};