
import { useState } from "react";
import { Login } from "./components/Login";
import { Home } from "./Home";

function App(){
  const [username, setUsername] = useState("")
  
  
  return username ?  (
      <Home />
  ) : <Login onSubmit={setUsername}/>

}

export default App;