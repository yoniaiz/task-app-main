const handleError = (err, res) => {
  const { statusCode, message } = err;
  console.log(statusCode, message)
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
module.exports = {
  ErrorHandler,
  handleError,
};
