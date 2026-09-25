const App = () => {

 
  // TASK 1 - Student Objects
  

  const students = [
    {
      id: 1,
      name: "Tabasiya",
      age: 21,
      course: "Full Stack Development"
    },
    {
      id: 2,
      name: "Priya",
      age: 22,
      course: "Python"
    },
    {
      id: 3,
      name: "Rahul",
      age: 21,
      course: "Java"
    },
    {
      id: 4,
      name: "Karthik",
      age: 23,
      course: "React"
    }
  ];


  // =========================
  // TASK 2 - Product Objects
  // =========================

  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Mobile",
      price: 25000,
      category: "Electronics"
    },
    {
      id: 3,
      name: "Headphones",
      price: 2000,
      category: "Accessories"
    },
    {
      id: 4,
      name: "Keyboard",
      price: 1500,
      category: "Accessories"
    },
    {
      id: 5,
      name: "Mouse",
      price: 800,
      category: "Accessories"
    }
  ];


  // =========================
  // TASK 3 - Employee Objects
  // =========================

  const employees = [
    {
      id: 1,
      name: "Arun",
      department: "IT",
      salary: 40000
    },
    {
      id: 2,
      name: "Priya",
      department: "HR",
      salary: 35000
    },
    {
      id: 3,
      name: "Rahul",
      department: "Finance",
      salary: 45000
    },
    {
      id: 4,
      name: "Divya",
      department: "Marketing",
      salary: 38000
    }
  ];


  return (
    <div className="bg-white min-h-screen p-5">

      {/* TASK 1 */}
      <h1 className="text-2xl font-bold">
        Task 1 - Student Details
      </h1>

      {students.map((student) => (
        <div
          key={student.id}
          className="border p-4 m-2"
        >
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>
          <p>Course: {student.course}</p>
        </div>
      ))}


      {/* TASK 2 */}
      <h1 className="text-2xl font-bold mt-6">
        Task 2 - Products
      </h1>

      <div className="flex gap-4 mt-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded"
          >
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>


      {/* TASK 3 */}
      <h1 className="text-2xl font-bold mt-6">
        Task 3 - Employee Details
      </h1>

      {employees.map((employee) => (
        <div
          key={employee.id}
          className="border p-4 m-2"
        >
          <p>ID: {employee.id}</p>
          <p>Name: {employee.name}</p>
          <p>Department: {employee.department}</p>
          <p>Salary: {employee.salary}</p>
        </div>
      ))}

    </div>
  );
};

export default App;