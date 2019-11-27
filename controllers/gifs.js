const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../db/index');
const helper = require('./helper');

const Gif = {
  async create(req, res) {
    const text = `INSERT INTO "public"."tw_gifs" (id, title, img_url, owner_id, created_on, modified_on)
            VALUES ($1, $2, $3, $4, $5, $6) returning *`;

    const createdOn = moment(new Date());
    const values = [
      uuidv4(), req.body.title, req.body.img_url,
      req.user.id, createdOn, moment(new Date()),
    ];
    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: 'success',
        data: {
          gifId: rows[0].id,
          message: 'GIF image successfully posted',
          createdOn,
          title: req.body.title,
          imageUrl: req.body.img_url,
          owner_id: req.user.id,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async delete(req, res) {
    const deleteQuery = 'DELETE FROM "public"."tw_gifs" WHERE id=$1 AND owner_id=$2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.gifId, req.user.id]);
      if (!rows[0]) {
        return res.status(400).send({
          message: 'gif image not found',
        });
      }
      return res.status(201).send({
        status: 'success',
        data: {
          message: 'gif post successfully deleted',
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getGif(req, res) {
    const text = 'SELECT * FROM "public"."tw_gifs" WHERE id=$1';
    const commentQuery = 'SELECT id, comment, owner_id FROM "public"."tw_gif_comments" WHERE gif_id=$1';

    try {
      const comments = await db.query(commentQuery, [req.params.gifId]);
      const { rows } = await db.query(text, [req.params.gifId]);
      if (!rows[0]) {
        return res.status(400).send({
          message: 'Gif not found',
        });
      }
      return res.status(200).send({
        status: 'success',
        data: {
          ...rows[0],
          comments: comments.rows,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

module.exports = Gif;
