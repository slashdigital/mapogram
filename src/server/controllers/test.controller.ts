import pool from '../config/dbconnector'

class TestController {
  public async get(req, res) {
    try {
      // const client = await pool.connect();

      // const sql = "SELECT * FROM users";
      // const { rows } = await client.query(sql);
      // const todos = rows;

      // client.release();

      res.send([])
    } catch (error) {
      res.status(400).send(error)
    }
  }
}

export default TestController
