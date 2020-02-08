import { IBaseEntity, IRepository } from '../interfaces/interfaces';

export interface IUser extends IBaseEntity {
    id: string;
    email: string;
    name: string;
    password: string;
    language: string;
    locale: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    roles: IUserRole[];
    tokens: IAuthToken[];
    apiTokens: IApiToken[];
}

export interface IAuthToken extends IBaseEntity {
    accessToken: string,
    kind: string
}

// Tokens to add / remove access to the API
export interface IApiToken  extends IBaseEntity {
    accessToken: string,
    // Maybe permissions, lapse time?
}

export interface IUserRepository extends IRepository<IUser> {
    get(id: object | string | number, options?: any): Promise<IUser>;
}

export interface IRegistryParams {
    password: string;
    email: string;
}

export interface IUserRole extends IBaseEntity {
    role: UserRoles;
    user?: IUser;
}

export enum UserRoles {
    'user',
    'admin',
    'superadmin'
}