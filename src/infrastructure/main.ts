import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { bindings } from './dependency_injection/inversify.config';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import session = require('express-session');
import { DataInitializer } from './boot/data-initializer';
import { TYPE } from './dependency_injection/types';

export const container = new Container();

(async () => {
    const port = 3000;
    await container.loadAsync(bindings);
    const initializer: DataInitializer = container.get(TYPE.Services.Infrastructure.DataInitializer);
    await initializer.initialize();
    const app = new InversifyExpressServer(container);

    const allowCrossDomain = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    };

    app.setConfig((application) => {
        const config = require('config');

        // add body parser
        application.use(bodyParser.urlencoded({
            extended: true,
            limit: '100mb'
        }));
        application.use(bodyParser.json({
            limit: '100mb'
        }));
        application.use(allowCrossDomain);

        require('./middleware/passport');
        application.use(session({secret: config.get('sessionKey'), resave: true, saveUninitialized: true}));
        application.use(passport.initialize());
        application.use(passport.session());

        application.use((req, res, next) => {
            res.locals.user = req.session.user;
            next();
        });
    });
    const server = app.build();
    
    server.listen(port, () => {
        console.log(`Server running at http://127.0.0.1:${port}/`)
    });

})();

