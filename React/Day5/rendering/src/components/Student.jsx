const Student = () => {
  const studentName = "Tabas";
  const age = 21;
  const course = "React JS";
  const isActive = true;
  const fees = 15000;

  return (
    <>
      <p>
        Student Name: <span style={{ color: "red" }}>{studentName}</span>.
        Age: <span style={{ color: "blue" }}>{age}</span>.
        Course: <span style={{ color: "green" }}>{course}</span>.
        Status:{" "}
        <span style={{ color: "purple" }}>
          {isActive ? "Active" : "Inactive"}
        </span>.
        Fees: <span style={{ color: "orange" }}>{fees}</span>.
      </p>
    </>
  );
};

export default Student;