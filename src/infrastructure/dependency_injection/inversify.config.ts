import { AsyncContainerModule } from 'inversify';
import { getDbConnection } from '../persistence/repository/typeorm/conn';
import { TYPE } from './types';
import { IUserRepository, IUserRole } from '../../domain/user/interfaces';
import { DataInitializer } from '../boot/data-initializer';
import { getUserRepository } from '../persistence/repository/typeorm/user';
import { AuthService } from '../../application/services/auth-service';
import { IRepository } from '../../domain/interfaces/interfaces';
import { getUserRoleRepository } from '../persistence/repository/typeorm/user-role';

export const bindings = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
    await require('../controllers/auth-controller');

    bind<IUserRepository>(TYPE.Repositories.Domain.User).toDynamicValue(() => {
        return getUserRepository();
    }).inSingletonScope();

    bind<IRepository<IUserRole>>(TYPE.Repositories.Domain.UserRole).toDynamicValue(() => {
        return getUserRoleRepository();
    }).inSingletonScope();

    bind<AuthService>(TYPE.Services.Application.Auth).to(AuthService).inSingletonScope();
    bind<DataInitializer>(TYPE.Services.Infrastructure.DataInitializer).to(DataInitializer).inSingletonScope();
});
