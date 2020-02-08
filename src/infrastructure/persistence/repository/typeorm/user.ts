import { EntityRepository, getConnection, MongoRepository } from 'typeorm';
import { userMapping } from '../../mapping/typeorm/user';
import { IUser, IUserRepository } from '../../../../domain/user/interfaces';

@EntityRepository(userMapping as any)
export class UserRepository extends MongoRepository<IUser> implements IUserRepository {
    public get(id: number, options?: any): Promise<IUser> {
        return super.findOneOrFail(id, options);
    }
}

export function getUserRepository() {
    const conn = getConnection();
    return conn.getCustomRepository(UserRepository);
}