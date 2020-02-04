export const TYPE = {
    Controllers: {
        UserController: Symbol('PlaylistController')
    },
    Repositories: {
        Domain: {
            User: Symbol('PlaylistRepository'),
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
