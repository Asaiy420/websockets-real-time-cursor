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
      <ul className="user-list">
        {Object.keys(users).map((uuid) => {
          const user = users[uuid];
          return <li key={uuid}>{user.username}</li>;
        })}
      </ul>
    );
  };

  const THROTTLE = 50;

  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    // Send initial cursor position
    sendJsonMessage({
      x: 0,
      y: 0,
    });

    // Set up mouse movement handler with throttling
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      sendJsonMessageThrottled.current({
        x: clientX,
        y: clientY,
      });
    };

    // Add the event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [sendJsonMessage]); // Include sendJsonMessage in dependencies

  if (
    lastJsonMessage &&
    typeof lastJsonMessage === "object" &&
    lastJsonMessage !== null
  ) {
    return (
      <div className="cursor-container">
        <h1>Hello {username}</h1>
        <div className="users-sidebar">
          <h2>Active Users</h2>
          {renderUserLists(lastJsonMessage as UsersMap)}
        </div>
        {renderCursors(lastJsonMessage as UsersMap)}
      </div>
    );
  }
  return <h1>Hello {username}, connecting...</h1>;
}
