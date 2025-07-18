import { useState } from "react";

interface LoginProps {
  onSubmit: (username: string) => void
}

export function Login({ onSubmit }: LoginProps) {
  const [username, setUsername] = useState("");

  return (
    <>
      <h1>Login Form</h1>
      <p>What do you wana be called mate?</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username);
        }}
      >
        <input
          type="text"
          value={username}
          placeholder="Your name mate"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
}
