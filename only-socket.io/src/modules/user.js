const UserData = {};

const insert = (username, password) => UserData[username] = password;

const findOne = user_name => {
  let password = null
  , username = null
  , user_Name = user_name.toLowerCase();

  for (let user in UserData){
    let userName = user.toLowerCase()
    if (userName.localeCompare(user_Name)) continue;

    username = username;
    password = UserData[user];
  }

  if (!password) return null;
  return { username, password };
};

const find = () => {
  let result = [];

  for (let username in UserData){
    result.push({ username, password : UserData[username] });
  }

  return result;
}

module.exports = { insert, findOne, find };