import * as express from 'express';
import { controller, httpGet, httpPost, request, requestBody, response } from 'inversify-express-utils';
import { jwtAuthMiddleware, localAuthMiddleware } from '../middleware/auth';
import { TYPE } from '../dependency_injection/types';
import { ApplicationUserService } from '../../application/services/user-service';
import { inject } from 'inversify';
import { IRegistryParams, IUser } from '../../domain/user/interfaces';

@controller('/api/v1/users')
export class PlaylistController {
    public constructor(
        @inject(TYPE.Services.Application.User) private userService: ApplicationUserService
    ) {
    }

    @httpGet('/auth', jwtAuthMiddleware({ role: 'user' }))
    public async getLoggedUser(
        @request() req: express.Request,
    ): Promise<IUser> {
        const user: IUser = await this.userService.get(req.user.id);
        delete user.password;
        return user;
    }


    @httpPost('/auth/local', localAuthMiddleware({role: 'user'}))
    public login(
        @request() req: express.Request,
    )  {
        const token: string = this.userService.generateJwt(req.user);
        return {token: token};
    }

    @httpPost('/auth')
    public async register(
        @request() req: express.Request,
        @response() res: express.Response,
        @requestBody() params: IRegistryParams,
    )  {
        try {
            const user: IUser = await this.userService.register(params);
            const token: string = this.userService.generateJwt(user);
            return {token: token};
        } catch (e) {
            res.status(401);
            return {error: e.message};
        }

    }
}