const path = require("path");
const { createLogger, format, transports } = require("winston");

const today = new Date();
const fileName = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;

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

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
