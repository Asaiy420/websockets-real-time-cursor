import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import url from "url";
import { v4 as uuidv4 } from "uuid";
const server = http.createServer();

const wss = new WebSocketServer({ server });

const PORT = 8000;

const connections: { [key: string]: WebSocket } = {};
const users: {[key: string]: Object} = {};

wss.on("connection", (connection, request: http.IncomingMessage) => {
  const requestUrl = request.url || "";
  const { username } = url.parse(requestUrl, true).query;
  const uuid = uuidv4();
  console.log(username, uuid);

  connections[uuid] = connection;


  users[uuid] = {
    username,
    state: { // basically keeping track of what the user is doing 
      x: 0,
      y: 0,
    }
  }

});

server.listen(PORT, () => {
  console.log(`Websocket is running on port, ${PORT}`);
});
