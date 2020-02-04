
import { AuthService } from '../../application/services/user-service';
import { inject, injectable } from 'inversify';
import { TYPE } from '../dependency_injection/types';
import { IUser } from '../../domain/user/interfaces';
import uuid = require('uuid');

@injectable()
export class DataInitializer {
    constructor(
        @inject(TYPE.Services.Application.Auth) private authService: AuthService,
    ) {
    }

    public async initialize(): Promise<void> {
        await this.createUsers();
    }

    private async createUsers(): Promise<void> {
        const initial: IUser[] = [
            {
                id: uuid.v4(),
                name: 'Alvaro Escarcha',
                email: 'admin@admin.com',
                password: '.seolaktal2ac!@l',
                language: '',
                locale: '',
                passwordResetToken: '',
                passwordResetExpires: undefined,
                tokens: [],
                apiTokens: []
            },
        ];

        await initial.forEach(async (initalItem) => {
            const exists: any = await this.authService.findByEmail(initalItem.email);
            if (!exists) {
                const res = await this.authService.create(initalItem);
                console.log('Created initial user', res);
            }
        });
    }

}