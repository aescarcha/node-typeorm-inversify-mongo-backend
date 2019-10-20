import { createConnection } from 'typeorm';
import { userMapping } from '../../mapping/typeorm/user';
import { apiTokenMapping } from '../../mapping/typeorm/api-token';
import { authTokenMapping } from '../../mapping/typeorm/auth-token';

export async function getDbConnection() {
    const config = require('config');

    const type = config.get('storage.database.type');
    const host = config.get('storage.database.host');
    const db = config.get('storage.database.database');
    const port = config.get('storage.database.port');
    const user = config.get('storage.database.user');
    const password = config.get('storage.database.password');

    const entities = [
        userMapping,
        apiTokenMapping,
        authTokenMapping,
    ];

    return await createConnection({
        type: type,
        host: host,
        port: port,
        username: user,
        password: password,
        database: db,
        entities: entities,
        // logging: 'all',
        synchronize: true
    });

}