import * as express from 'express';
import { controller, httpGet, httpPost, request, requestBody, response } from 'inversify-express-utils';
import { jwtAuthMiddleware, localAuthMiddleware } from '../middleware/auth';
import { TYPE } from '../dependency_injection/types';
import { AuthService } from '../../application/services/auth-service';
import { inject } from 'inversify';
import { IRegistryParams, IUser } from '../../domain/user/interfaces';
import { IQueryResult, ITransactionResult } from '../../application/interfaces/dtos';
import uuid = require('uuid');

@controller('/api/v1/users/auth')
export class AuthController {
    public constructor(
        @inject(TYPE.Services.Application.Auth) private authService: AuthService
    ) {
    }

    @httpGet('/', jwtAuthMiddleware({ role: 'user' }))
    public async getLoggedUser(
        @request() req: express.Request,
    ): Promise<IQueryResult<IUser>> {
        const user: IUser = await this.authService.get(req.user.id);
        delete user.password;
        return {
            data: user,
        };
    }


    @httpPost('/local', localAuthMiddleware({role: 'user'}))
    public login(
        @request() req: express.Request,
    ) {
        const token: string = this.authService.generateJwt(req.user);
        return {
            token: token
        };
    }

    @httpPost('/')
    public async register(
        @request() req: express.Request,
        @response() res: express.Response,
        @requestBody() params: IRegistryParams,
    ): Promise<ITransactionResult<IUser>> {
        try {
            const user: IUser = await this.authService.register(params);
            delete user.password;
            const token: string = this.authService.generateJwt(user);
            user.tokens.push(
                {
                    id: uuid.v4(),
                    accessToken: token,
                    kind: 'login'
                }
                );
            return {
                data: user,
                result: 'success'
            };
        } catch (e) {
            res.status(401);
            return {
                result: 'error',
                error: e.message
            };
        }
    }
}