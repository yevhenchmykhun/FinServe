const jsonServer = require('json-server');

const delayMiddleware = (req, res, next) => {
  setTimeout(() => {
    next()
  }, 500) // Add a 0.5 second delay
}

const server = jsonServer.create();
server.use(jsonServer.defaults());
server.use(delayMiddleware);
// server.use(jsonServer.bodyParser);


server.get('/api/business-dates', (req, res) => {
  const data = require('./data/business-dates.json');
  res.status(200).send(data);
});

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});