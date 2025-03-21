// Custom error class to extend the default Error class
// This allows adding a status code and other properties to error objects
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
