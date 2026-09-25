import { useState } from "react";

const App = () => {
  // Task 1 - Name Input
  const [name, setName] = useState("");

  // Task 2 - Email Submit
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Task 3 - Age Validation
  const [age, setAge] = useState("");
  const [ageMessage, setAgeMessage] = useState("");

  // Task 4 - Search Input
  const [search, setSearch] = useState("");

  // Task 2
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setSubmittedEmail(email);
  };

  // Task 3
  const handleAgeSubmit = (e) => {
    e.preventDefault();

    if (age === "") {
      setAgeMessage("Age is required");
    } else {
      setAgeMessage(`Entered Age: ${age}`);
      setAge("");
    }
  };

  return (
    <div>

      {/* ================= TASK 1 ================= */}
      <h2>Task 1 - Name Input</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>{name}</p>


      {/* ================= TASK 2 ================= */}
      <h2>Task 2 - Email Submit</h2>

      <form onSubmit={handleEmailSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <p>{submittedEmail}</p>


      {/* ================= TASK 3 ================= */}
      <h2>Task 3 - Age Validation</h2>

      <form onSubmit={handleAgeSubmit}>
        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <p>{ageMessage}</p>


      {/* ================= TASK 4 ================= */}
      <h2>Task 4 - Search Input</h2>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>You are searching for: {search}</p>

    </div>
  );
};

export default App;