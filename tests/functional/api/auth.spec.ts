import { cleanUpMetadata } from 'inversify-express-utils';
import { Application } from 'express';
import { beforeEach } from 'mocha';
import { ApplicationBuilder } from '../test-application-builder';
import * as request from 'supertest';
import { users } from '../../test-data';
import { expect } from 'chai';
import { UserRoles } from '../../../src/domain/user/interfaces';

describe('User API functional test:', () => {
    let app: Application;
    let token = '';
    beforeEach(async () => {
        app = await ApplicationBuilder.bootServer();
    });

    before(async () => {
        await ApplicationBuilder.recreateDatabase();
        await ApplicationBuilder.deleteServer();
    });

    afterEach(async() => {
        cleanUpMetadata();
        await ApplicationBuilder.getConnection();
    });

    it('Should create users', async () => {
        const result = await request(app)
            .post('/api/v1/users/auth')
            .send({
                email: users[0].email,
                password: users[0].password
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(result.body.result).to.be.equal('success');
        expect(result.body.data.email).to.deep.equal(users[0].email);
        expect(result.body.data.roles[0].role).to.deep.equal(UserRoles.user);
        expect(result.body.data.password).to.be.undefined;


        const result2 = await request(app)
            .post('/api/v1/users/auth')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(result2.body.result).to.be.equal('success');
        expect(result2.body.data.email).to.deep.equal(users[1].email);
        expect(result.body.data.roles[0].role).to.deep.equal(UserRoles.user);
        expect(result2.body.data.password).to.be.undefined;
    });

    it('should be able to login and get a token', async () => {
        const result = await request(app)
            .post('/api/v1/users/auth/local')
            .send({
                email: users[0].email,
                password: users[0].password
            })
            .expect(200)
            .expect('Content-Type', /json/);

        expect(result.body.token.length).to.be.above(10);
        token = result.body.token;
    });


    it('should be able to fetch data from his user', async () => {
        const result = await request(app)
            .get(`/api/v1/users/auth`)
            .set('Authorization', `bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/);

        expect(result.body.data.email).to.equal(users[0].email);
        // Check password is not there
        expect(result.body.data.password).to.be.undefined;
        expect(result.body.data.roles[0].role).to.deep.equal(UserRoles.user);
    });

});

