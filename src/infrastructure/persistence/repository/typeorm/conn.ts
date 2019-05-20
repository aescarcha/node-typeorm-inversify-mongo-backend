import { createConnection } from 'typeorm';
import { userMapping } from '../../mapping/typeorm/user';

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
        authSource: 'admin',
        useNewUrlParser: true,
        // logging: 'all',
        synchronize: false
    });

}