import { EntitySchema } from 'typeorm';
import { IUser } from '../../../../domain/user/interfaces';
import { ApiToken, AuthToken, UserRole } from '../../../../domain/user/user';
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
        // Hacky hack: TypeOrm does not support objects as type yet in EntitySchema (it does for @Entity),
        // and it does not support relatonships
        /* tslint:disable */
        tokens: {
            type: ApiToken as any
        },
        apiTokens: {
            type: AuthToken as any
        },
        roles: {
            type: UserRole as any
        }
        /* tslint:enable */
    },

});