class TestController {
  public async get(_req, res) {
    try {
      res.send([]);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default TestController;
