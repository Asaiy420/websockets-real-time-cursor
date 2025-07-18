import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { Cursor } from "./components/Cursor";

interface Userstate {
  x: number;
  y: number;
}

interface HomeProps {
  username: string;
}

interface User {
  username: string | string[] | undefined;
  state: Userstate;
}

type UsersMap = Record<string, User>;

export function Home({ username }: HomeProps) {
  const WS_URL = "http://localhost:8000";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const renderCursors = (users: UsersMap) => {
    return Object.keys(users).map((uuid) => {
      const user = users[uuid];

      return <Cursor key={uuid} point={[user.state.x, user.state.y]} />;
    });
  };

  const renderUserLists = (users: UsersMap) => {
    return (
      <ul>
        {Object.keys(users).map((uuid) => {
          return <li key={uuid}>{JSON.stringify(users[uuid])}</li>;
        })}
      </ul>
    );
  };

  const THROTTLE = 50;

  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });

    window.addEventListener("mousemove", (e: MouseEvent) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  if (
    lastJsonMessage &&
    typeof lastJsonMessage === "object" &&
    lastJsonMessage !== null
  ) {
    return (
      <>
        {renderCursors(lastJsonMessage as UsersMap)}
        {renderUserLists(lastJsonMessage as UsersMap)}
      </>
    );
  }
  return <h1>Hello {username}</h1>;
}
