const db = require('../db/index');

const Post = {
  async getFeed(req, res) {
    const queryText = 'SELECT * FROM "public"."tw_articles" UNION SELECT * FROM "public"."tw_gifs" ORDER BY created_on DESC';

    try {
      const result = await db.query(queryText);
      if (!result.rows[0]) {
        return res.status(400).send({
          message: 'No feeds',
        });
      }
      return res.status(201).send({
        status: 'success',
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },
};

module.exports = Post;
