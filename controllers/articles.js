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
            console.log(error);
            return res.status(400).send(error);
        }

    },

    async update(req, res) {
        const findOneQuery = `SELECT * FROM "public"."tw_articles" WHERE id=$1 AND owner_id=$2`;
        const updateOneQuery = `UPDATE "public"."tw_articles" 
            SET title=$1, article_body=$2, modified_on=$3 WHERE id=$4 and owner_id=$5 returning *`;
        const modifiedOn = moment(new Date());
        try {
            const { rows } = await db.query(findOneQuery, [req.params.articleId, req.user.id]);
            if(!rows[0]) {
                return res.status(404).send({
                    message: "article not found"
                });
            }
            const values = [
                req.body.title || rows[0].title,
                req.body.article_body || rows[0].article_body,
                modifiedOn,
                req.params.articleId,
                req.user.id
            ];
            const response = await db.query(updateOneQuery, values);
            return res.status(200).send({
                status: 'success',
                data: {
                    message: 'Article successfully updated',
                    articleId: rows[0].id,
                    modifiedOn,
                    title: req.body.title,
                    article: response.rows[0].article_body,
                    owner_id: req.user.id
                }
            })
        } catch(err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }
}

module.exports = Article;