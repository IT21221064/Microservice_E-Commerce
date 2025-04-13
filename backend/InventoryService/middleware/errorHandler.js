// utils/errorResponse.js

class ErrorResponse extends Error {
  /**
   * Create custom ErrorResponse extending the Error class
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguish operational errors from programming errors

    // Capture stack trace (excluding constructor call from it)
    Error.captureStackTrace(this, this.constructor);

    // Additional debugging info (optional)
    this.timestamp = new Date().toISOString();
  }

  /**
   * Create a standardized error response object
   * @returns {Object} - Standardized error response
   */
  toJSON() {
    return {
      success: false,
      error: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      stack: process.env.NODE_ENV === "development" ? this.stack : undefined,
    };
  }

  /**
   * Create a not found error
   * @param {string} resource - Name of the resource not found
   * @returns {ErrorResponse} - 404 Not Found error
   */
  static notFound(resource) {
    return new ErrorResponse(`${resource} not found`, 404);
  }

  /**
   * Create a bad request error
   * @param {string} message - Error message
   * @returns {ErrorResponse} - 400 Bad Request error
   */
  static badRequest(message) {
    return new ErrorResponse(message, 400);
  }

  /**
   * Create an unauthorized error
   * @param {string} message - Error message
   * @returns {ErrorResponse} - 401 Unauthorized error
   */
  static unauthorized(message = "Not authorized to access this resource") {
    return new ErrorResponse(message, 401);
  }

  /**
   * Create a forbidden error
   * @param {string} message - Error message
   * @returns {ErrorResponse} - 403 Forbidden error
   */
  static forbidden(message = "Forbidden") {
    return new ErrorResponse(message, 403);
  }

  /**
   * Create a validation error
   * @param {Array|string} errors - Validation errors
   * @returns {ErrorResponse} - 422 Unprocessable Entity error
   */
  static validationError(errors) {
    const message = Array.isArray(errors)
      ? errors.map((e) => e.msg || e.message).join(", ")
      : errors;
    return new ErrorResponse(message, 422);
  }

  /**
   * Create a server error
   * @param {string} message - Error message
   * @returns {ErrorResponse} - 500 Internal Server Error
   */
  static serverError(message = "Internal Server Error") {
    return new ErrorResponse(message, 500);
  }
}

module.exports = ErrorResponse;
