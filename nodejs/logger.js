const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'HH:mm:ss:SSS'
        }),
        winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),   // Logs to console
        // new winston.transports.File({ filename: 'app.log' })  // Logs to a file named 'app.log'
    ]
});

module.exports = logger;
