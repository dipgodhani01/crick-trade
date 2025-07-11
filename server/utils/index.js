const path = require("path");
const { createLogger, format, transports } = require("winston");

const today = new Date();
const fileName = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;

exports.logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.prettyPrint()),
  defaultMeta: {
    service: "user-service",
  },
  transports: [
    new transports.File({
      filename: path.join(__dirname, `../logs/${fileName}_error.log`),
      level: "error",
    }),
    new transports.File({
      filename: path.join(__dirname, `../logs/${fileName}_info.log`),
    }),
    new transports.Console({ format: format.simple() }),
  ],
});