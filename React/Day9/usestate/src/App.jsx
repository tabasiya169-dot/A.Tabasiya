import { useState } from "react";

const App = () => {
  // Task 1 - Counter
  const [count, setCount] = useState(0);

  // Task 2 - Text Change
  const [text, setText] = useState("Hello React");

  // Task 3 - Hide and Show
  const [show, setShow] = useState(true);

  return (
    <div>
      {/* ================= TASK 1 ================= */}
      <h2>Task 1 - Counter</h2>

      <h3>Count: {count}</h3>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>


      {/* ================= TASK 2 ================= */}
      <h2>Task 2 - Text Change</h2>

      <h3>{text}</h3>

      <button onClick={() => setText("Welcome to React")}>
        Change Text
      </button>


      {/* ================= TASK 3 ================= */}
      <h2>Task 3 - Hide and Show</h2>

      {show && <p>This is the content to hide and show.</p>}

      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default App;