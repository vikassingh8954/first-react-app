import "./styles.css";
import FavoriteColor from "./FavoriteColor";
import Timer from "./Timer";
import ContextComponent from "./ContextComponent";
import UserList from "./UserList";

export default function App() {
  return (
    <div className="App">
      <FavoriteColor>
        <Timer />
        <ContextComponent />
        <UserList />
      </FavoriteColor>
    </div>
  );
}
