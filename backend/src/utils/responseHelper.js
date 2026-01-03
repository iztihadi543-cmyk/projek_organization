/**
 * API Response Helper
 * Standardized API response format
 */

/**
 * Success response
 */
exports.success = (res, message, data = null, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Error response
 */
exports.error = (res, message, statusCode = 500, errors = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

/**
 * Created response (201)
 */
exports.created = (res, message, data) => {
  res.status(201).json({
    success: true,
    message,
    data
  });
};

/**
 * Not found response (404)
 */
exports.notFound = (res, message = 'Resource tidak ditemukan') => {
  res.status(404).json({
    success: false,
    message
  });
};

/**
 * Validation error response (400)
 */
exports.validationError = (res, errors) => {
  res.status(400).json({
    success: false,
    message: 'Validasi gagal',
    errors
  });
};

/**
 * Paginated response
 */
exports.paginated = (res, message, data, pagination) => {
  res.status(200).json({
    success: true,
    message,
    ...data,
    pagination
  });
};

