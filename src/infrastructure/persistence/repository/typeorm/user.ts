import { EntityRepository, getConnection, MongoRepository } from 'typeorm';
import { userMapping } from '../../mapping/typeorm/user';
import { IUser, IUserRepository } from '../../../../domain/user/interfaces';

@EntityRepository(userMapping as any)
export class UserRepository extends MongoRepository<IUser> implements IUserRepository {
    public get(id: number): Promise<IUser> {
        return super.findOneOrFail(id);
    }
}

export function getUserRepository() {
    const conn = getConnection();
    return conn.getCustomRepository(UserRepository);
}