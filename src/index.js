const url = require('url');
const path = require('path');
const WebSocket = require('ws');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const app = new Koa();
const WebSocketServer = WebSocket.Server;

// path
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const staticPath = resolve('views');

// log request url
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// static files
app.use(serve(staticPath));

// parse request body:
app.use(bodyParser());

const server = app.listen(8003, () => {
  console.log('app started at port 8003...');
});

function createWebSocketServer(
  server,
  onConnection,
  onMessage,
  onClose,
  onError,
) {
  const wss = new WebSocketServer({
    server,
  });
  wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  onConnection =
    onConnection ||
    function () {
      console.log('[WebSocket] connected');
    };

  onClose =
    onClose ||
    function (code, msg) {
      console.log(`[WebSocket] closed: ${code} - ${msg}`);
    };

  onError =
    onError ||
    function (err) {
      console.log(`[WebSocket] error: ${err}`);
    };

  wss.on('connection', (ws) => {
    onMessage =
      onMessage ||
      function (data) {
        console.log(`[WebSocket] message received: ${data}`);

        if (ws.readyState === WebSocket.OPEN) {
          ws.send('接收客户端消息成功!');
        }

        // Broadcast to everyone else.
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      };

    ws.on('message', onMessage);
    ws.on('close', onClose);
    ws.on('error', onError);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send('服务器端连接成功啦!');
    }
  });

  return wss;
}

app.wss = createWebSocketServer(server);
