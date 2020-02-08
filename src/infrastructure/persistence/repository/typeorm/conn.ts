import { createConnection } from 'typeorm';
import { userMapping } from '../../mapping/typeorm/user';
import { apiTokenMapping } from '../../mapping/typeorm/api-token';
import { authTokenMapping } from '../../mapping/typeorm/auth-token';
import { userRoleMapping } from '../../mapping/typeorm/user-role';

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
        userRoleMapping,
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
        authMechanism: 'SCRAM-SHA-1', // for mongo
        authSource: 'admin', // for mongo
        useNewUrlParser: true, // for mongo
        // logging: 'all',
        synchronize: true
    });

}