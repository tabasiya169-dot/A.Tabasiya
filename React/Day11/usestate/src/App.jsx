import { useState } from "react";

const App = () => {

  // TASK 1

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    city: ""
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };


  // TASK 2

  const [formData2, setFormData2] = useState({
    employeeName: "",
    employeeId: "",
    department: "",
    role: "",
    salary: ""
  });

  const handleChange2 = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData2({
      ...formData2,
      [name]: value
    });
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();

    console.log(formData2);

    setFormData2({
      employeeName: "",
      employeeId: "",
      department: "",
      role: "",
      salary: ""
    });
  };


  return (
    <>
      <h2>Task 1</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 m-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 m-2"
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border p-2 m-2"
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          className="border p-2 m-2"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 m-2"
        />

        <button type="submit" className="border p-2 m-2">
          Submit
        </button>

      </form>


      <h2>Task 2</h2>

      <form onSubmit={handleSubmit2}>

        <input
          type="text"
          name="employeeName"
          placeholder="Employee Name"
          value={formData2.employeeName}
          onChange={handleChange2}
          className="border p-2 m-2"
        />

        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={formData2.employeeId}
          onChange={handleChange2}
          className="border p-2 m-2"
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData2.department}
          onChange={handleChange2}
          className="border p-2 m-2"
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData2.role}
          onChange={handleChange2}
          className="border p-2 m-2"
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData2.salary}
          onChange={handleChange2}
          className="border p-2 m-2"
        />

        <button type="submit" className="border p-2 m-2">
          Submit
        </button>

      </form>
    </>
  );
};

export default App;