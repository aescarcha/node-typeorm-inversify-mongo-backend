export const TYPE = {
    Controllers: {
        UserController: Symbol('UserController')
    },
    Repositories: {
        Domain: {
            User: Symbol('UserRepository'),
            UserRole: Symbol('UserRoleRepository'),
        }
    },
    Services: {
        Application: {
            Auth: Symbol('AuthService'),
        },
        Infrastructure: {
            DataInitializer: Symbol('DataInitializerService')
        }
    }
};
