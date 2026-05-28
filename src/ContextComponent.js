import { useContext } from "react";
import UserContext from "./UserContext";

function ContextComponent() {
  const color = useContext(UserContext);
  return (
    <>
      <h1>contextComponent</h1>
      <h2>Hello {color} again!</h2>
    </>
  );
}

export default ContextComponent;
