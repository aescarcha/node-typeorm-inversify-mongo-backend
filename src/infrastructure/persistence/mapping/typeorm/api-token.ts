import { EntitySchema } from 'typeorm';
import { ApiToken } from '../../../../domain/user/user';
import { baseColumnsSchemaPart } from './base';

export const apiTokenMapping = new EntitySchema<ApiToken>({
    name: 'ApiToken',
    tableName: 'api_tokens',
    columns: {
        ...baseColumnsSchemaPart,
        accessToken: {
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