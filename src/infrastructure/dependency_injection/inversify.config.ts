import { AsyncContainerModule } from 'inversify';
import { getDbConnection } from '../persistence/repository/typeorm/conn';
import { TYPE } from './types';
import { IUserRepository } from '../../domain/user/interfaces';
import { DataInitializer } from '../boot/data-initializer';
import { getUserRepository } from '../persistence/repository/typeorm/user';
import { AuthService } from '../../application/services/user-service';

export const bindings = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
    await require('../controllers/auth-controller');

    bind<IUserRepository>(TYPE.Repositories.Domain.User).toDynamicValue(() => {
        return getUserRepository();
    }).inSingletonScope();

    bind<AuthService>(TYPE.Services.Application.Auth).to(AuthService).inSingletonScope();
    bind<DataInitializer>(TYPE.Services.Infrastructure.DataInitializer).to(DataInitializer).inSingletonScope();
});
