import { AsyncContainerModule } from 'inversify';
import { getDbConnection } from '../persistence/repository/typeorm/conn';
import { TYPE } from './types';
import { IUserRepository } from '../../domain/user/interfaces';
import { DataInitializer } from '../boot/data-initializer';
import { getUserRepository } from '../persistence/repository/typeorm/user';
import { ApplicationUserService } from '../../application/services/user-service';
import { DomainUserService } from '../../domain/user/user-service';

export const bindings = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
    await require('../controllers/user-controller');

    bind<IUserRepository>(TYPE.Repositories.Domain.User).toDynamicValue(() => {
        return getUserRepository();
    }).inSingletonScope();

    bind<ApplicationUserService>(TYPE.Services.Application.User).to(ApplicationUserService).inSingletonScope();
    bind<DomainUserService>(TYPE.Services.Domain.User).to(DomainUserService).inSingletonScope();
    bind<DataInitializer>(TYPE.Services.Infrastructure.DataInitializer).to(DataInitializer).inSingletonScope();
});
