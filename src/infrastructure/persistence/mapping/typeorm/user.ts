import { EntitySchema } from 'typeorm';
import { IUser } from '../../../../domain/user/interfaces';
import { baseColumnsSchemaPart } from './base';

export const userMapping = new EntitySchema<IUser>({
    name: 'User',
    tableName: 'users',
    columns: {
        ...baseColumnsSchemaPart,
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        language: {
            type: String,
        },
        locale: {
            type: String,
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetExpires: {
            type: Date,
        },
    },
    relations: {
        tokens: {
            type: 'one-to-many',
            target: 'AuthToken',
        },
        apiTokens: {
            type: 'one-to-many',
            target: 'ApiToken',
        },
    }
});