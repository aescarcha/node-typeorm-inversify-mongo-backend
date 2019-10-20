import { IApiToken, IAuthToken, IUser } from './interfaces';


export class ApiToken implements IApiToken {
    public id?: string;
    public user: IUser;
    public accessToken: string;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
}

export class AuthToken implements IAuthToken {
    public id?: string;
    public user: IUser;
    public accessToken: string;
    public kind: string;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
}