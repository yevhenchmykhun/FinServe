const jsonServer = require('json-server');

const delayMiddleware = (req, res, next) => {
  setTimeout(() => {
    next()
  }, 500) // Add a 0.5 second delay
}

const authMiddleware = (req, res, next) => {
  if (req.originalUrl !== "/api/auth/token") {

    // check if 'Authorization' header is present
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401)
        .json({
          message: "Authorization header is missing"
        });
    }

    // check if token is present
    const token = header.substring(header.indexOf(" ") + 1);
    if (!token) {
      return res.status(401)
        .json({
          message: "Token is missing"
        });
    }

    try {

      // check if token is not expired
      const decodedToken = JSON.parse(token);
      if (decodedToken.expiresAt < Date.now()) {
        return res.status(401)
          .json({
            message: "Token expired"
          });
      }
    } catch (error) {
      console.log(error);

      // provided token is not valid
      return res.status(401)
        .json({
          message: "Token is not valid"
        });
    }
  }
  
  next();
}

const server = jsonServer.create();
server.use(jsonServer.defaults());
server.use(delayMiddleware);
server.use(authMiddleware);
// server.use(jsonServer.bodyParser);

server.get('/api/auth/token', (req, res) => {
  const token = {
    name: 'John Doe',
    roles: ['User'],
    expiresAt: Date.now() + 1000 * 60 * 15 // now + 15 minutes
  }
  res.status(200).send(token);
});

server.get('/api/business-dates', (req, res) => {
  const data = require('./data/business-dates.json');
  res.status(200).send(data);
});

server.get('/api/reports', (req, res) => {
  const path = Math.random() < 0.5 ? './data/reports-1.json' : './data/reports-2.json'
  const data = require(path);
  res.status(200).send(data);
});

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});