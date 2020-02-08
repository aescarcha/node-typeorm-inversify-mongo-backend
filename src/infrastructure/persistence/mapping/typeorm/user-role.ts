import { EntitySchema } from 'typeorm';
import { baseColumnsSchemaPart } from './base';
import { IUserRole } from '../../../../domain/user/interfaces';

export const userRoleMapping = new EntitySchema<IUserRole>({
    name: 'UserRole',
    tableName: 'user_roles',
    columns: {
        ...baseColumnsSchemaPart,
        role: {
            type: Number,
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: { name: 'user_id' }
        },
    }
});