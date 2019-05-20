import { EntitySchema } from 'typeorm';
import { IUser } from '../../../../domain/user/interfaces';
import { ApiToken, AuthToken } from '../../../../domain/user/user';

export const userMapping = new EntitySchema<IUser>({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            type: String,
            primary: true,
            generated: true,
            objectId: true
        },
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
        createdAt: {
            type: Date,
            nullable: true,
            default: true
        },
        updatedAt: {
            type: Date,
            nullable: true
        },
        deletedAt: {
            type: Date,
            nullable: true
        },
        // Hacky hack: TypeOrm does not support objects as type yet in EntitySchema (it does for @Entity)
        /* tslint:disable */
        tokens: {
            type: ApiToken as any
        },
        apiTokens: {
            type: AuthToken as any
        }
        /* tslint:enable */
    },
});