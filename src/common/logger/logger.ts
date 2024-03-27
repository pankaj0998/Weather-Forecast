import { createLogger, format, transports } from 'winston'
import { configuration } from '../config/configuration';

const label = configuration.app.name

const logFormat = format.printf(
    ({ timestamp, label, level, message, ms }) => {
        return `${timestamp}, ${[label]}, ${[level]}: ${message} ${ms}`;
    });

const formats = [
    format.timestamp(),
    format.ms(),
    format.label({ label })
];
export const logger = createLogger({
    level: "silly",
    format: format.combine(
        ...formats, logFormat
    ),
    defaultMeta: configuration.app.name,
    transports: [
        new transports.File({
            filename: 'logs/combined.log'
        }),
        new transports.File({
            level: "error",
            filename: "logs/error.log",
        }),
        new transports.Console()
    ],
});