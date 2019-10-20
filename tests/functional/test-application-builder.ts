import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import { getConnection } from 'typeorm';
import * as passport from 'passport';
import session = require('express-session');
import { bindings } from '../../src/infrastructure/dependency_injection/inversify.config';

export let container = new Container();
export class ApplicationBuilder {
    private static application: Application;

    public static async bootServer() {
        if (!ApplicationBuilder.application) {
            container = new Container();
            await container.loadAsync(bindings);
            const server = new InversifyExpressServer(container);
            server.setConfig((application) => {
                const config = require('config');
                application.use(bodyParser.urlencoded({
                    extended: true,
                    limit: '100mb'
                }));
                application.use(bodyParser.json({
                    limit: '100mb'
                }));

                require('../../src/infrastructure/middleware/passport');
                application.use(session({secret: config.get('sessionKey'), resave: true, saveUninitialized: true}));
                application.use(passport.initialize());
                application.use(passport.session());

                application.use((req, res, next) => {
                    res.locals.user = req.session.user;
                    next();
                });
            });
            ApplicationBuilder.application = server.build();
        } else {
            await ApplicationBuilder.closeConnections();
        }

        return ApplicationBuilder.application;
    }


    public static async closeConnections() {
        getConnection().isConnected || await getConnection().connect(); // tslint:disable-line
    }
}
