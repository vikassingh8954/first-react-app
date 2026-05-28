import "./styles.css";
import { useState } from "react";
import FavoriteColor from "./FavoriteColor";
import Timer from "./Timer";
import ContextComponent from "./ContextComponent";
import UserList from "./UserList";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("timer");

  const screens = [
    { id: "timer", label: "Timer", content: <Timer /> },
    { id: "context", label: "Context", content: <ContextComponent /> },
    {
      id: "users",
      label: "User List",
      content: (
        <UserList
          apiUrl={
            process.env.REACT_APP_API_URL ||
            "https://glowing-adventure-p7rqjpjgpw47f6w54-8080.app.github.dev/java-coding-practice/api/users"
          }
          authToken={process.env.REACT_APP_API_TOKEN}
          authType="Bearer"
          credentials="include"
        />
      ),
    },
  ];

  const currentScreen = screens.find((screen) => screen.id === activeScreen);

  return (
    <div className="App">
      <FavoriteColor>
        <nav className="menu">
          {screens.map((screen) => (
            <button
              key={screen.id}
              className={screen.id === activeScreen ? "active" : ""}
              onClick={() => setActiveScreen(screen.id)}
            >
              {screen.label}
            </button>
          ))}
        </nav>
        <div className="screen">{currentScreen?.content}</div>
      </FavoriteColor>
    </div>
  );
}
