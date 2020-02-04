import { EntitySchema } from 'typeorm';
import { AuthToken } from '../../../../domain/user/user';
import { baseColumnsSchemaPart } from './base';

export const authTokenMapping = new EntitySchema<AuthToken>({
    name: 'AuthToken',
    tableName: 'auth_tokens',
    columns: {
        ...baseColumnsSchemaPart,
        accessToken: {
            type: String,
        },
        kind: {
            type: String,
        },
    },
    // TODO This need works in mongo
    // relations: {
    //     user: {
    //         type: 'many-to-one',
    //         target: 'User',
    //     },
    // }

});