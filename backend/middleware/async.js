// Async handler middleware to avoid try/catch blocks in controllers
// This wrapper catches any errors and passes them to the error handler middleware
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
