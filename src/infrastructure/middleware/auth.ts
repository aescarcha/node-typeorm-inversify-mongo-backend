import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';

function apiAuthMiddlewareFactory() {
    const config = require('config');
    return (authParams: any) => {
        return (req: Request, res: Response, next: NextFunction) => {
            if (req.header('Service-Auth') !== config.get('serviceApiToken')) {
                return res.status(401).end('Unauthorized')
            }
            next();
        };
    };
}

const internalApiAuthMiddleware = apiAuthMiddlewareFactory();

// JWT
function jwtAuthMiddlewareFactory() {
    return (config: { role: string }) => {
        return (req: Request, res: Response, next: NextFunction) => {
            // This can be extended by using services or repos from the container to check roles etc
            passport.authenticate('jwt', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).end('Unauthorized')
                }
                req.logIn(user, (loginErr) => {
                    if (loginErr) { return next(loginErr); }
                    next();
                });
            })(req, res, next);
        };
    };
}

const jwtAuthMiddleware = jwtAuthMiddlewareFactory();


// Password / username
function localLoginMiddlewareFactory() {
    return (config: { role: string }) => {
        return (req: Request, res: Response, next: NextFunction) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).end('Unauthorized')
                }
                req.logIn(user, (error) => {
                    if (error) { return next(error); }
                    next();
                });
            })(req, res, next);
        };
    };
}

const localAuthMiddleware = localLoginMiddlewareFactory();


export { internalApiAuthMiddleware, jwtAuthMiddleware, localAuthMiddleware };
