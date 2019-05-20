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
        Domain: {
            User: Symbol('UserDomainService'),
        },
        Application: {
            User: Symbol('UserApplicationService'),
        },
        Infrastructure: {
            DataInitializer: Symbol('DataInitializerService')
        }
    }
};
