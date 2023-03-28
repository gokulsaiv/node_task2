const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("userData", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});
async function testConnection() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
testConnection();
const User = sequelize.define("users", {
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9]+$/,
      notNull: true,
      notEmpty: true,
      len: [2, 30],
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9]+$/,
      notNull: true,
      notEmpty: true,
      len: [2, 30],
    },
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      isNumeric: true,
      min: 4,
      max: 130,
    },
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});
module.exports = User;
