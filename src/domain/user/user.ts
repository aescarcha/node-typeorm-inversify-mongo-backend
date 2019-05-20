import { IApiToken, IAuthToken } from './interfaces';

export class ApiToken implements IApiToken {
    public accessToken: string;
}

export class AuthToken implements IAuthToken {
    public accessToken: string;
    public kind: string;
}