const got = require('got');

const dataService = async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const options = {
    method: 'GET',
  };
  const response = await got(url, options);
  const { body } = response;
  const respBody = JSON.parse(body);
  return respBody;
};

module.exports = dataService;
