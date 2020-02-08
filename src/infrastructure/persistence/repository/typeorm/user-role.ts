import { EntityRepository, getConnection, MongoRepository } from 'typeorm';
import { IUserRole } from '../../../../domain/user/interfaces';
import { IRepository } from '../../../../domain/interfaces/interfaces';
import { userRoleMapping } from '../../mapping/typeorm/user-role';

@EntityRepository(userRoleMapping as any)
export class UserRoleRepository extends MongoRepository<IUserRole> implements IRepository<IUserRole> {
}

export function getUserRoleRepository() {
    const conn = getConnection();
    return conn.getCustomRepository(UserRoleRepository);
}