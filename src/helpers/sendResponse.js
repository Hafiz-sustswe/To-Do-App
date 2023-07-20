const sendResponse = (res, data) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

module.exports = sendResponse;
