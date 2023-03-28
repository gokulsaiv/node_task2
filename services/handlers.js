const { v4: uuidv4 } = require("uuid");

const users = [
  {
    id: "e5ec2cf8-543d-4d3a-a6cb-7cfac2641653",
    user: "kvsgoku",
    password: "kvs123",
    age: 11,
    isDeleted: false,
  },
];
class UserServices {
  addUserService(body) {
    users.push({
      id: `${uuidv4()}`,
      user: `${body.user}`,
      password: `${body.password}`,
      age: Number(body.age),
      isDeleted: false,
    });
    console.log(users);

    return {
      status: "successfully inserted",
      users: `${JSON.stringify(users[users.length - 1])}`,
    };
  }
  getUserService(params) {
    for (const user of users) {
      if (user.id === params.id) {
        return user;
      }
    }

    return {
      msg: "users not found",
      status: 404,
    };
  }
  deleteUserService(params) {
    const id = params.id;
    let index = -1;

    for (const users of users) {
      index++;
      console.log(index);
      if (id == users.id) {
        users[index].isDeleted = true;
        return `soft deleted the users
        ${JSON.stringify(users[index])}`;
      } else {
        return false;
      }
    }
  }
  updateUserService(body) {
    const id = body.id;
    let index = -1;
    let userPrevData;
    for (const userIterator of users) {
      index++;
      console.log(index);
      if (userIterator.id === id) {
        userPrevData = userIterator;
      }
    }
    console.log(userPrevData);

    if (index < users.length) {
      users[index] = {
        id: `${userPrevData.id}`,
        user: `${body.user ? body.user : userPrevData.user}`,
        password: `${body.password ? body.password : userPrevData.password}`,
        age: `${body.age ? body.age : userPrevData.age}`,
        isDeleted: false,
      };
      index = -1;
      return {
        msg: `updation successfull of id ${userPrevData.id}`,
        users: `${JSON.stringify(users[index])}`,
      };
    } else {
      index = -1;
      return {
        msg: "index of of bound!",
        status: 404,
      };
    }
  }
  getUserAutoSuggestService(params) {
    let limit = Number(params.limit);
    const subStr = params.loginStr;

    const querySet = [];

    for (const element of users) {
      if (element.user.includes(subStr)) {
        if (limit) {
          querySet.push(element);
        } else {
          break;
        }
        limit--;
      }
    }
    return querySet;
  }
}

module.exports = UserServices;
