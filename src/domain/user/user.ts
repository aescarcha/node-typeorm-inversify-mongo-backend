import { IApiToken, IAuthToken, IUser, IUserRole, UserRoles } from './interfaces';
import { BaseEntity } from '../base-entity';


export class ApiToken extends BaseEntity implements IApiToken {
    public user: IUser;
    public accessToken: string;
}

export class AuthToken extends BaseEntity implements IAuthToken {
    public user: IUser;
    public accessToken: string;
    public kind: string;
}

export class UserRole extends BaseEntity implements IUserRole {
    public role: UserRoles;
    public user: IUser;
}