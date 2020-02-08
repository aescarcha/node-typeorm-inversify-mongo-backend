import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as passportJwt from 'passport-jwt';
import { AuthService } from '../../application/services/auth-service';
import { TYPE } from '../dependency_injection/types';
import { IUser } from '../../domain/user/interfaces';
import { Container } from 'inversify';

export function loadPassport(container: Container) {
    const localStrategy = passportLocal.Strategy;
    const jwtStrategy = passportJwt.Strategy;

    const config = require('config');
    const authService = container.get<AuthService>(TYPE.Services.Application.Auth);

    passport.serializeUser<IUser, string>((user: IUser, done) => {
        done(undefined, user.id);
    });

    passport.deserializeUser<IUser, number>(async (id, done) => {
        try {
            const user = await authService.get(id);
            done(undefined, user);
        } catch (e) {
            done(e, undefined);
        }
    });

    /**
     * Sign in using Email and Password.
     */
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        authService.findByEmail(email.toLowerCase()).then( (user: any) => {
            if (!user) {
                return done(undefined, false, { message: `Email ${email} not found.` });
            }
            authService.comparePassword(user, password, (err: Error, isMatch: boolean) => {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(undefined, user);
                }
                return done(undefined, false, { message: 'Invalid email or password.' });
            });
        }).catch((err) => {
            return done(err);
        });
    }));


    /**
     * OAuth Strategy Overview
     *
     * - User is already logged in.
     *   - Check if there is an existing account with a provider id.
     *     - If there is, return an error message. (Account merging not supported)
     *     - Else link new OAuth account with currently logged-in user.
     * - User is not logged in.
     *   - Check if it's a returning user.
     *     - If returning user, sign in and we are done.
     *     - Else check if there is an existing account with user's email.
     *       - If there is, return an error message.
     *       - Else create a new account.
     */

    const opts: passportJwt.StrategyOptions = {
        // jwtFromRequest : passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        jwtFromRequest : passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : config.get('apiKey'),
    };
    passport.use(new jwtStrategy(opts, (jwtPayload, done) => {
        authService.get(jwtPayload.id).then((user) => {
            if ((user && `${user.id}` !== `${jwtPayload.id}` )) {
                return done(undefined, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        }).catch((err) => {
            return done(err, false);

        });
    }));


// /**
//  * Login Required middleware.
//  */
// export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//     if (req.session.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// };
//
// /**
//  * Authorization Required middleware.
//  */
// export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
//     const provider = req.path.split('/').slice(-1)[0];
//
//     if (_.find(req.session.user.tokens, { kind: provider })) {
//         next();
//     } else {
//         res.redirect(`/auth/${provider}`);
//     }
// };

}
