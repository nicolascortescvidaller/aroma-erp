function successResponse(data, message = "Operacion exitosa") {
  return {
    success: true,
    data,
    message
  };
}

function errorResponse(error, code = "INTERNAL_ERROR") {
  return {
    success: false,
    error,
    code
  };
}

module.exports = {
  successResponse,
  errorResponse
};
