const Message = [];

const insert = (username, message) => {
  Message.push({
    username,
    message,
    time : new Date().getTime()
  });
}

const find = (start = 0, limit = 0) => {
  if (limit === 0) return [ ...Message ];
  
  limit = +limit;
  start = +start;

  let last = Message.length - 1
  , newStart = last - start
  , newLimit = newStart - limit;

  newLimit < 0 && (newLimit = 0);

  newStart += newLimit;
  newLimit = newStart - newLimit;
  newStart -= newLimit;

  return Message.slice(newStart, newLimit);
}

module.exports = { insert, find };