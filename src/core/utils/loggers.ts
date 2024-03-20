import fs from 'node:fs';
import pino, { Level } from 'pino';
import PinoPretty from 'pino-pretty';
import { configurations } from './configurations';
import { FileWatcher } from './file-watcher';

/**
 * Input configuration for creating a logger.
 */
type CreateLoggerInput = {
	filename?: string;
	level: Level;
	logToConsole?: boolean;
	logToFile?: boolean;
};

/**
 * Creates a logger with flexible configuration options.
 * @param options - Configuration options for the logger.
 * @returns The configured logger.
 */
const createLogger = ({ filename, level, logToConsole = true, logToFile = true }: CreateLoggerInput) => {
	const streams: Array<pino.StreamEntry> = [];

	if (logToFile) {
		const filePath = `logs/${filename}.log`;
		const stream = pino.destination({ dest: filePath, append: true, sync: true });
		streams.push({ stream, level });

		if (configurations.logging.rotation.enabled) {
			new FileWatcher({ filePath }).on('sizeChange', (newSize, _) => {
				if (newSize < configurations.logging.rotation.fileSize) return;

				stream.flushSync();
				fs.copyFileSync(filePath, `logs/archive/${filename}-${new Date().toISOString()}.log`);
				fs.writeFileSync(filePath, '');
				stream.reopen(filePath);
			});
		}
	}

	if (logToConsole) {
		streams.push({
			stream: PinoPretty({
				colorize: true,
				sync: true,
				append: true,
				colorizeObjects: true,
				minimumLevel: level,
			}),
			level,
		});
	}

	return pino(
		{
			formatters: { level: (label) => ({ level: label }) },
			timestamp: pino.stdTimeFunctions.isoTime,
			level,
		},
		pino.multistream(streams)
	);
};

export const loggers = {
	requests: createLogger({ filename: 'requests', level: configurations.logging.level, logToConsole: false }),
	exceptions: createLogger({ filename: 'exceptions', level: configurations.logging.level, logToConsole: true }),
	database: createLogger({ filename: 'database', level: configurations.logging.level, logToConsole: true }),
	redis: createLogger({ filename: 'redis', level: configurations.logging.level, logToConsole: true }),
	application: createLogger({ filename: 'application', level: configurations.logging.level, logToFile: false }),
};
