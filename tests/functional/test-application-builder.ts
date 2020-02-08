import { Application } from 'express';
import { createServer, runDataInitializer } from '../../src/infrastructure/main';
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
        await getConnection().synchronize(true);
        return runDataInitializer();
    }


    public static async getConnection() {
        getConnection().isConnected || await getConnection().connect(); // tslint:disable-line
    }

    static async deleteServer() {
        try {
            if (getConnection() && getConnection().isConnected) {
                await getConnection().close();
            }
        } catch (e) {
            console.log('Error closing connection');
        }
    }
}

