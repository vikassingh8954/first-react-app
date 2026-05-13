import { useState, useEffect, createContext, useContext, useRef } from "react";
import "./styles.css";

const UserContext = createContext();

function FavoriteColor({ children }) {
  const [color] = useState("red");

  return (
    <UserContext.Provider value={color}>
      <h1>Hello {color}!</h1>
      {children}
    </UserContext.Provider>
  );
}

function Timer() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current = countRef.current + 1;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <p>Type in the input field:</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {countRef.current}</h1>
      <h1>I've rendered {count} times!</h1>
    </>
  );
}

function ContextComponent() {
  const color = useContext(UserContext);
  return (
    <>
      <h1>contextComponent</h1>
      <h2>Hello {color} again!</h2>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <FavoriteColor>
        <Timer />
        <ContextComponent />
      </FavoriteColor>
    </div>
  );
}
