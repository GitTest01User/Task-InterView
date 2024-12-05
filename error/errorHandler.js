class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode || 500).json({
      success: false,
      message: message || 'Internal Server Error',
    });
  };
  
  module.exports = { ErrorHandler, handleError };
  