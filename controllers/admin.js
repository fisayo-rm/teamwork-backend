const uuidv4 = require('uuid/v4');
const db = require('../db/index');
const helper = require('./helper');

const Admin = {
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'Some values are missing',
      });
    }
    if (!helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        message: 'Please enter a valid email address',
      });
    }
    const hashPassword = helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO "public"."tw_admins" 
      ( id, email, password ) VALUES ($1, $2, $3) returning *`;
    const values = [uuidv4(), req.body.email, hashPassword];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = helper.generateToken(rows[0].id);
      return res.status(201).send({
        status: 'success',
        data: {
          message: 'Admin account created successfully',
          token,
          adminId: rows[0].id,
        },
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: 'error',
          error: 'Email already exists',
        });
      }
      return res.status(400).send({
        status: 'error',
        error,
      });
    }
  },

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'Some values are missing',
      });
    }
    if (!helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        message: 'Please enter a valid email address',
      });
    }
    const loginQuery = 'SELECT * FROM "public"."tw_admins" WHERE email=$1';
    try {
      const { rows } = await db.query(loginQuery, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({
          message: 'Username does not exist',
        });
      }
      if (!helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({
          message: 'Incorrect password',
        });
      }
      const token = helper.generateToken(rows[0].id);
      return res.status(200).send({
        status: 'success',
        data: {
          token,
          adminId: rows[0].id,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

module.exports = Admin;
