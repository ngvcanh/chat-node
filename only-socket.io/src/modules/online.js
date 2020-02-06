const Online = [];

const insert = username => Online.indexOf(username) === -1 && Online.push(username);

const find = () => [ ...Online ];

module.exports = { insert, find };