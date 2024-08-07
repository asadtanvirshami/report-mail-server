const errorLogger = (request, code, error, table, no, msg) => {
  return console.error(
    `[REQ:${request}, CODE:${code}, ERROR:${error}, TABLE:${table}, DB:${no}, MESSAGE:${msg}]`
  );
};

module.exports = errorLogger;
