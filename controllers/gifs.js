const moment = require("moment");
const uuidv4 = require("uuid/v4");
const db = require("../db/index");
const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const Gif = {
  async create(req, res) {
    if (!req.files) {
      return res.status(400).send({
        message: "No file uploaded"
      });
    }
    const imageFile = {};
    const filename = req.files.gif.path;
    await cloudinary.uploader.upload(filename, (err, image) => {
      imageFile.url = image.url;
      imageFile.public_id = image.public_id;

      if(error) {
        imageFile.url = "https://media.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif";
        return res.status(400).send({
          status: "error",
          error
        });
      }
    })

    const text = `INSERT INTO "public"."tw_gifs" (id, title, img_url, owner_id, created_on, modified_on)
            VALUES ($1, $2, $3, $4, $5, $6) returning *`;

    const createdOn = moment(new Date());
    const values = [
      uuidv4(),
      req.body.title,
      imageFile.url,
      req.user.id,
      createdOn,
      moment(new Date())
    ];
    try {
      const { rows } = await db.query(text, values);
      console.log(weGlobal)
      return res.status(201).send({
        status: "success",
        data: {
          gifId: rows[0].id,
          message: "GIF image successfully posted",
          createdOn,
          title: req.body.title,
          imageUrl: rows[0].img_url,
          owner_id: req.user.id
        }
      });
    } catch (error) {
      return res.status(400).send({
        status: "error",
        error
      });
    }
  },

  async delete(req, res) {
    const deleteQuery =
      'DELETE FROM "public"."tw_gifs" WHERE id=$1 AND owner_id=$2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [
        req.params.gifId,
        req.user.id
      ]);
      if (!rows[0]) {
        return res.status(400).send({
          status: "error",
          error: "gif image not found"
        });
      }
      return res.status(201).send({
        status: "success",
        data: {
          message: "gif post successfully deleted"
        }
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getGif(req, res) {
    const text = 'SELECT * FROM "public"."tw_gifs" WHERE id=$1';
    const commentQuery =
      'SELECT id, comment, owner_id FROM "public"."tw_gif_comments" WHERE gif_id=$1';

    try {
      const comments = await db.query(commentQuery, [req.params.gifId]);
      const { rows } = await db.query(text, [req.params.gifId]);
      if (!rows[0]) {
        return res.status(400).send({
          status: "error",
          error: "Gif not found"
        });
      }
      return res.status(200).send({
        status: "success",
        data: {
          ...rows[0],
          comments: comments.rows
        }
      });
    } catch (error) {
      return res.status(400).send({
        status: "error",
        error
      });
    }
  }
};

module.exports = Gif;
