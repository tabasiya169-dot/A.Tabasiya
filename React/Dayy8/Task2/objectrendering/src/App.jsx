const App = () => {
  // TASK 1 - Student Object


  const student = {
    name: "Tabasiya",
    age: 21,
    course: "Full Stack Development",
    city: "Chennai"
  };

  // TASK 2 - Employee Object

  const employee = {
    name: "Rahul",
    role: "Frontend Developer",
    salary: 35000,
    location: "Chennai"
  };

  // TASK 3 - Product Object

  const product = {
    name: "Laptop",
    price: 50000,
    category: "Electronics",
    brand: "Dell"
  };


  return (
    <div className="bg-white min-h-screen p-5">

      {/* TASK 1 */}
      <h1 className="text-2xl font-bold">
        Task 1 - Student Details
      </h1>

      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Course: {student.course}</p>
      <p>City: {student.city}</p>


      {/* TASK 2 */}
      <h1 className="text-2xl font-bold mt-6">
        Task 2 - Employee Details
      </h1>

      <p>Name: {employee.name}</p>
      <p>Role: {employee.role}</p>
      <p>Salary: {employee.salary}</p>
      <p>Location: {employee.location}</p>


      {/* TASK 3 */}
      <h1 className="text-2xl font-bold mt-6">
        Task 3 - Product Details
      </h1>

      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>

    </div>
  );
};

export default App;