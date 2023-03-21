let id = 1;
let data = [];

const addDataHandler = (body) => {
  data.push({
    id: `${id++}`,
    userName: `${body.user}`,
    password: `${body.password}`,
    age: Number(body.age),
    isDeleted: false,
  });
  return {
    status: "successfully inserted",
  };
};
const getDateHandler = (body) => {
  for (const personData of data) {
    if (personData.id === body.id) {
      return personData;
    }
  }

  return {
    status: "data not found",
  };
};

const deleteDataHandler = (body) => {
  const flag = body.flag;
  const index = Number(body.idDelete);

  if (flag === "true") {
    data[index - 1].isDeleted = !data[index - 1].isDeleted;
    return `soft deleted the data
      ${JSON.stringify(data[index - 1])}`;
  } else {
    data.splice(index - 1, 1);
    return `hard deleted the data
      ${JSON.stringify(data[index - 1])}`;
  }
};

const updateDataHandler = (body) => {
  const id = Number(body.updateId);
  //const {oldUser,oldPassword,oldAge}=data[id-1];
  const oldData = data[id - 1];

  const { updateUser, updatePassword, updateAge } = body;

  if (id - 1 < data.length) {
    data[id - 1] = {
      id: `${id}`,
      userName: `${updateUser ? updateUser : oldData.userName}`,
      password: `${updatePassword ? updatePassword : oldData.password}`,
      age: `${updateAge ? updateAge : oldData.age}`,
      isDeleted: false,
    };

    return "done updating!";
  } else {
    return {
      status: "index of of bound!",
    };
  }
};

const autoSuggestHandler = (body) => {
  const limit = Number(body.limit);
  const subStr = body.autoString;
  const querySet = [];

  for (const element of data) {
    if (element.userName.includes(subStr)) {
      querySet.push(element);
    }
  }
  return querySet.slice(0, limit);
};
module.exports = {
  autoSuggestHandler,
  addDataHandler,
  getDateHandler,
  updateDataHandler,
  deleteDataHandler,
};
