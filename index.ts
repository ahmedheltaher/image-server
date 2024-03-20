import { Application, configurations, loggers } from './src/core';


async function registerShutdownHandlers(application: Application) {
	process.on('SIGINT', () => {
		loggers.exceptions.info('Application is shutting down...');
		application.close();
	});

	process.on('SIGTERM', () => {
		loggers.exceptions.info('Application is shutting down...');
		application.close();
	});

	process.on('uncaughtException', (error) => {
		loggers.exceptions.error(`Application is shutting down... ${error}`);
		application.close();
		process.exit(1);
	});

	process.on('unhandledRejection', (error) => {
		loggers.exceptions.error(`Application is shutting down... ${error}`);
		application.close();
		process.exit(1);
	});
}

async function Main() {
	try {
		const applicationInstance = new Application();
		await applicationInstance.initialize();
		await registerShutdownHandlers(applicationInstance);

		applicationInstance.listen({ port: configurations.server.port, host: configurations.server.host });
	} catch (error) {
		loggers.exceptions.error(`Error during application startup: ${error}`);
		process.exit(1);
	}
}

Main();
