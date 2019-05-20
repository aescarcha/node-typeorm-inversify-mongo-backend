import { inject, injectable } from 'inversify';
import { TYPE } from '../../infrastructure/dependency_injection/types';
import { IRegistryParams, IUser } from '../../domain/user/interfaces';
import * as bcrypt from 'bcrypt-nodejs';
import { DomainUserService } from '../../domain/user/user-service';
import { sign } from 'jsonwebtoken';

@injectable()
export class ApplicationUserService {
    private crypto = require('crypto');
    private config = require('config');

    constructor(
        @inject(TYPE.Services.Domain.User) private domainUserService: DomainUserService
    ) {}

    public async create(element: IUser): Promise<IUser> {
        if (await this.findByEmail(element.email)) {
            throw new Error('Error creating');
        }
        element.password = await this.hashString(element.password);
        return this.domainUserService.create(element);
    }

    public get(id: object | string | number): Promise<IUser> {
        return this.domainUserService.get(id);
    }

    public async findByEmail(email: string): Promise<IUser> {
        return this.domainUserService.findByEmail(email);
    }

    public comparePassword(user, candidatePassword: string, cb: (err: any, isMatch: any) => {}): void {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch: boolean) => {
            cb(err, isMatch);
        });
    }

    public async register(params: IRegistryParams) {
        const user = {
            name: '',
            email: params.email,
            password: params.password,
            language: '',
            locale: '',
            passwordResetToken: '',
            passwordResetExpires: undefined,
            tokens: [],
            apiTokens: []
        };

        return this.create(user);
    }

    public generateJwt( user: IUser ) {
        const expiry: Date = new Date();
        expiry.setDate(expiry.getDate() + 365);

        return sign({
            id: user.id,
            email: user.email,
            randomizer: this.crypto.randomBytes(20).toString('hex'),
            creationDate: Date.now(),
            exp: (expiry.getTime() / 1000),
        }, this.config.get('apiKey'));
    }

    protected hashString(str: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    reject();
                }
                bcrypt.hash(str, salt, undefined, async (error, hash) => {
                    if (error) {
                        reject();
                    }
                    resolve(hash);
                });
            });
        });
    }
}