import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import url from "url";
import { v4 as uuidv4 } from "uuid";

type User = {
  username: string | string[] | undefined;
  state: Object;
};

const server = http.createServer();

const wss = new WebSocketServer({ server });

const PORT = 8000;

const connections: { [key: string]: WebSocket } = {};

const users: { [key: string]: User } = {};

const broadcast = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users);
    connection?.send(message);
  });
};

const handleMessage = (bytes: WebSocket.RawData, uuid: string) => {
  const message = JSON.parse(bytes.toString());
  const user = users[uuid];
  if (!user) return;
  user.state = message; 

  broadcast();
}; 

const handleClose = (uuid: string) => {
  delete connections[uuid];
  delete users[uuid]

  broadcast();

};

wss.on("connection", (connection, request: http.IncomingMessage) => {
  const requestUrl = request.url || "";
  const { username } = url.parse(requestUrl, true).query;
  const uuid = uuidv4();
  console.log(username, uuid);

  connections[uuid] = connection;

  users[uuid] = {
    username,
    state: {},
  };

  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(PORT, () => {
  console.log(`Websocket is running on port, ${PORT}`);
});
