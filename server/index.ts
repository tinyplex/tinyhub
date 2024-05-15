import {createServer} from 'http';

const server = createServer();

server.on('request', (request, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(
    JSON.stringify({
      data: 'Hello World!',
    }),
  );
});

server.listen(8000);
