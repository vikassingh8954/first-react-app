import { useState, useEffect, useRef } from "react";

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

export default Timer;
