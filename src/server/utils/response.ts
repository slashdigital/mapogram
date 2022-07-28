class Response {
  public success(res, data) {
    return res.status('200').json({
      data: data,
      error: false,
    });
  }
  public error(res, data, statusCode = '400') {
    return res.status(statusCode).json({
      message: data,
      error: true,
    });
  }
}

export default new Response();
