const moment = require("moment");
const uuidv4 = require("uuid/v4");
const db = require("../db/index");

const Gif = {
    async create(req, res) {
        const text = `INSERT INTO "public"."tw_gif_comments" 
        (id, comment, owner_id, gif_id, created_on, modified_on) 
        VALUES ($1, $2, $3, $4, $5, $6) returning *`;

        const getGifPropQuery = `SELECT * FROM "public"."tw_gifs" WHERE id=$1`;

        try {
            const response = await db.query(getGifPropQuery, [req.params.gifId]);
            const values = [
                uuidv4(),
                req.body.comment,
                req.user.id,
                req.params.gifId,
                moment(new Date()),
                moment(new Date())
            ];
            const { rows } = await db.query(text, values);
            return res.status(201).send({
                status: 'success',
                data: {
                    message: 'comment successfully created',
                    createdOn: rows[0].created_on,
                    gifTitle: response.rows[0].title,
                    comment: rows[0].comment,
                    commentFrom: req.user.id
                }
            });
        } catch(error) {
            return res.status(400).send(error);
        }
    }
};

module.exports = Gif;