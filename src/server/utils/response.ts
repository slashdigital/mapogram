class Response {
  public success(res, data) {
    return res.json(data);
  }
}

export default new Response();