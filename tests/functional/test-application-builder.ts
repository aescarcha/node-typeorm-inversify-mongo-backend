import { Application } from 'express';
import { createServer } from '../../src/infrastructure/main';
import { getConnection } from 'typeorm';


export class ApplicationBuilder {
    private static application: Application;

    public static async bootServer() {
        if (!ApplicationBuilder.application) {
            ApplicationBuilder.application = await createServer(true);
        } else {
            await ApplicationBuilder.getConnection();
        }

        return ApplicationBuilder.application;
    }

    public static async recreateDatabase() {
        await ApplicationBuilder.bootServer();
        return await getConnection().synchronize(true);
    }


    public static async getConnection() {
        getConnection().isConnected || await getConnection().connect(); // tslint:disable-line
    }

    // Delete the server so we can recreate it with the initial data
    static async deleteServer() {
        await getConnection().close();
        delete ApplicationBuilder.application;
    }
}

