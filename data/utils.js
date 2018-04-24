const jwt = require('jsonwebtoken');
const APP_SECRET = 'secret';

function getUser(context) {
  const Authorization = context.authorization;
  console.log(Authorization);
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    console.log(token);
    const { username } = jwt.verify(token, APP_SECRET);
    console.log(username);
    return username;
  }

  throw new Error('Not authenticated')
}

export default getUser;