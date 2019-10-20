import { cleanUpMetadata } from 'inversify-express-utils';
import { Application } from 'express';
import { beforeEach } from 'mocha';
import { ApplicationBuilder } from '../test-application-builder';

describe('Contact API functional test:', () => {
    let app: Application;
    beforeEach(async () => {
        app = await ApplicationBuilder.bootServer();
    });

    afterEach(async() => {
        cleanUpMetadata();
        await ApplicationBuilder.closeConnections();
    });

    it('Should process contact requests', async () => {
        console.log(app);
    });

});

