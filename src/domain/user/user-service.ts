import { inject, injectable } from 'inversify';
import { IUser, IUserRepository } from './interfaces';
import { TYPE } from '../../infrastructure/dependency_injection/types';

@injectable()
export class DomainUserService {
    constructor(
        @inject(TYPE.Repositories.Domain.User) private userRepository: IUserRepository
    ) {}

    public create(element: IUser): Promise<IUser> {
        element.createdAt = new Date();
        return this.userRepository.save(element);
    }

    public get(id: object | string | number): Promise<IUser> {
        return this.userRepository.get(id);
    }

    public async findByEmail(email: string): Promise<IUser> {
        return this.userRepository.findOne({email: email});
    }
}