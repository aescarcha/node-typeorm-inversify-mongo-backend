
import { AuthService } from '../../application/services/auth-service';
import { inject, injectable } from 'inversify';
import { TYPE } from '../dependency_injection/types';
import { IUser, UserRoles } from '../../domain/user/interfaces';
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
                roles: [
                    {
                        id: uuid.v4(),
                        created: new Date(),
                        role: UserRoles.user
                    },
                    {
                        id: uuid.v4(),
                        created: new Date(),
                        role: UserRoles.admin
                    },
                    {
                        id: uuid.v4(),
                        created: new Date(),
                        role: UserRoles.superadmin
                    }
                ],
                tokens: [],
                apiTokens: []
            },
        ];

        await initial.forEach(async (initalItem) => {
            try {
                const exists: any = await this.authService.findByEmail(initalItem.email);
                if (!exists) {
                    const res = await this.authService.create(initalItem);
                    console.log('Created initial user', res.email);
                }
            } catch (e) {
                console.warn('Error creating initial user', initalItem.email);
            }
        });
    }

}