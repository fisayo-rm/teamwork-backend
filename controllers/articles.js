const moment = require("moment");
const uuidv4 = require("uuid/v4");
const db = require("../db/index");
const helper = require("./helper");

const Article = {
    async create(req, res) {
        const text = `INSERT INTO "public"."tw_articles" (id, title, article_body, owner_id, created_on, modified_on) 
        VALUES ($1, $2, $3, $4, $5, $6) returning *`;

        const createdOn = moment(new Date());

        const values = [
            uuidv4(), req.body.title, req.body.article_body, req.user.id,
            createdOn, moment(new Date())
        ];
        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send({
                status: 'success',
                data: {
                    message: 'Article successfully posted',
                    articleId: rows[0].id,
                    createdOn,
                    title: req.body.title,
                    owner_id: req.user.id
                }
            });
        } catch(error) {
            return res.status(400).send(error);
        }

    }
}

module.exports = Article;