- 1. [http://www.cnblogs.com/1wen/p/5808276.html](http://www.cnblogs.com/1wen/p/5808276.html)
- 2. [https://github.com/websockets/ws/blob/master/examples/serverstats/server.js](https://github.com/websockets/ws/blob/master/examples/serverstats/server.js)
- 3. [https://github.com/michaelliao/learn-javascript/blob/master/samples/node/web/ws/ws-with-koa/app.js](https://github.com/michaelliao/learn-javascript/blob/master/samples/node/web/ws/ws-with-koa/app.js)

## WebSocket 心跳重连

### 心跳重连缘由

在使用 websocket 过程中, 可能会出现网络断开的情况，比如网络信号不好，或者网络临时性关闭，这时候 websocket 的连接已经断开，而浏览器不会执行 websockets 的 `onclose` 方法, 我们没法知道是否断开连接，也就没法进行重连操作。

如果当前发送websocket数据到后端，一旦请求超时， `onclose` 便可进行绑定好的重连操作。

### 如何实现？

如果希望websocket连接一直保持, 我们会在 `close` 或者 `error` 上绑定重新连接方法。

```js

ws.onclose = function () {
  reconnect()
}

ws.onerror = function () {
  reconnect()
}

```
