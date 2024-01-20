import winston from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';

const dailyRotateFileTransport = new DailyRotateFile({
  filename: 'logs/auth-%DATE%.log',
  datePattern: 'YYYY-MM-DD', 
  zippedArchive: true, 
  maxSize: undefined,
  maxFiles: undefined, 
});

const auth = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json(),
  ),
  transports: [
    dailyRotateFileTransport,
  ]
});

// if (process.env.NODE_ENV !== 'production') {
//   auth.add(new winston.transports.Console({
//     format: winston.format.combine(
//         winston.format.timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss'
//         }),
//         winston.format.json()
//     )
//   }));
// }

export default auth;