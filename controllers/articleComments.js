const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../db/index');

const Comment = {
  async create(req, res) {
    const text = `INSERT INTO "public"."tw_article_comments" 
        (id, comment, owner_id, article_id, created_on, modified_on) 
        VALUES ($1, $2, $3, $4, $5, $6) returning *`;

    const getArticlePropQuery = 'SELECT * FROM "public"."tw_articles" WHERE id=$1';

    const createdOn = moment(new Date());

    try {
      const response = await db.query(getArticlePropQuery, [req.params.articleId]);
      const values = [
        uuidv4(),
        req.body.comment,
        req.user.id,
        req.params.articleId,
        createdOn,
        moment(new Date()),
      ];
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: 'success',
        data: {
          message: 'Comment successfully created',
          createdOn,
          articleTitle: response.rows[0].title,
          article: response.rows[0].article_body,
          // comment: req.body.comment,
          comment: rows[0].comment,
        },
      });
    } catch (error) {
      return res.status(400).send({
        status: "error",
        error
      });
    }
  },
};

module.exports = Comment;
