const errorHandler = (err, req, res, next) => {
  console.error(err)

  const errorResponse = {
    message: err.message || "Internal server error"
  }

  const statusCode = err.statusCode || 500

  res.status(statusCode).json(errorResponse)
}

export default errorHandler