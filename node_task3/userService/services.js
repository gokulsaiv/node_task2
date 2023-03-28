const pool = require("../dataAccess/postgresConnection");
const user = require("../userModel/model");
class Service {
  async get(params) {
    let user;
    try {
      user = await pool.query(`SELECT * FROM users WHERE ID =${params.id}`);
    } catch (error) {
      const errs = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return errs;
    }

    return user.rows;
  }
  async add(body) {
    let userCreateResponse;

    try {
      await user.create({
        login: `${body.login}`,
        password: `${body.password}`,
        age: body.age,
        isDeleted: false,
      });
    } catch (error) {
      const errs = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return errs;
    }
    return {
      login: `${body.login}`,
      password: `${body.password}`,
      age: body.age,
      isDeleted: false,
    };
  }
  async getAutoSuggest(subStr, limit) {
    let users;
    try {
      users = await pool.query(
        `SELECT * FROM users WHERE login LIKE '%${subStr}%' LIMIT ${limit} ;`
      );
    } catch (error) {
      const errs = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return errs;
    }

    return users.rows;
  }
  async delete(userId) {
    let isDeletedUser;
    try {
      isDeletedUser = await user.update(
        { isDeleted: true },
        {
          where: {
            id: userId,
          },
        }
      );
    } catch (error) {
      const errs = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return errs;
    }

    return isDeletedUser;
  }
  async update(userId, userData) {
    let updateUser;
    try {
      updateUser = await user.update(userData, {
        where: {
          id: userId,
        },
      });
    } catch (error) {
      const errs = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return errs;
    }

    return updateUser[0];
  }
}

module.exports = Service;
