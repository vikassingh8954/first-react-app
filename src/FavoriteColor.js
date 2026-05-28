import { useState } from "react";
import UserContext from "./UserContext";

function FavoriteColor({ children }) {
  const [color] = useState("red");

  return (
    <UserContext.Provider value={color}>
      <h1>Hello {color}!</h1>
      {children}
    </UserContext.Provider>
  );
}

export default FavoriteColor;
