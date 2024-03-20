import { EventEmitter } from 'events';
import fs from 'fs';

/**
 * Represents options for configuring a file watcher.
 */
interface FileWatcherOptions {
	/**
	 * The path to the file to be watched.
	 */
	filePath: string;

	/**
	 * The interval (in milliseconds) at which to check for changes in file size.
	 */
	interval?: number;

	/**
	 * Optional callback function to handle errors.
	 */
	onError?: (error: NodeJS.ErrnoException) => void;

	/**
	 * Optional callback function to be called when the watcher is ready.
	 */
	onReady?: (size: number) => void;
}

/**
 * Represents a file watcher that monitors changes in file size.
 */
export class FileWatcher extends EventEmitter {
	private filePath: string;
	private interval: FileWatcherOptions['interval'];
	private onError: FileWatcherOptions['onError'];
	private currentSize: number;
	private timer: NodeJS.Timeout | null;
	private onReady: FileWatcherOptions['onReady'];

	/**
	 * Creates a new instance of FileWatcher.
	 * @param filePath The path to the file to be watched.
	 * @param options Configuration options for the file watcher.
	 */
	constructor({ onReady, interval, onError, filePath }: FileWatcherOptions) {
		super();
		this.filePath = filePath;
		this.interval = interval ?? 100;
		this.onError = onError;
		this.currentSize = -1;
		this.timer = null;

		this.checkFileSize();

		this.once('ready', () => {
			onReady?.(this.currentSize);
			this.start();
		});
	}

	/**
	 * Starts the file watcher.
	 */
	start(): void {
		this.timer = setInterval(() => {
			this.checkFileSize();
		}, this.interval);
	}

	/**
	 * Stops the file watcher.
	 */
	stop(): void {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}

	/**
	 * Retrieves information about the current file size being watched.
	 * @returns An object containing the current file size.
	 */
	getInfo(): { size: number } {
		return { size: this.currentSize };
	}

	/**
	 * Checks the file size and emits events if it has changed.
	 */
	private checkFileSize(): void {
		fs.stat(this.filePath, (err, stats) => {
			if (err) {
				this.onError?.(err);
				if (err.code === 'ENOENT' && this.currentSize !== 0) {
					this.emitSizeChange(0);
				}
			} else if (stats.size !== this.currentSize) {
				this.emitSizeChange(stats.size);
			}
		});
	}

	/**
	 * Emits an event indicating a change in file size.
	 * @param newSize The new size of the file.
	 */
	private emitSizeChange(newSize: number): void {
		if (this.currentSize === -1) {
			this.emit('ready', newSize);
		} else {
			this.emit('sizeChange', newSize, this.currentSize);
		}
		this.currentSize = newSize;
	}
}
