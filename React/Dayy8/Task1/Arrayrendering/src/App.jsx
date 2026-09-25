const App = () => {

  // TASK 1 - Programming Languages
  
  const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "React"
  ];

  // TASK 2 - City Names


  const cities = [
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Coimbatore"
  ];

  // TASK 3 - Course Names

  const courses = [
    "Full Stack Development",
    "Python",
    "Java",
    "React",
    "Web Development"
  ];

  return (
    <div className="bg-white min-h-screen p-5">

      {/* TASK 1 */}
      <h1 className="text-2xl font-bold">
        Task 1 - Programming Languages
      </h1>

      {languages.map((language, index) => (
        <p key={index}>{language}</p>
      ))}


      {/* TASK 2 */}
      <h1 className="text-2xl font-bold mt-6">
        Task 2 - City Names
      </h1>

      {cities.map((city, index) => (
        <p key={index}>{city}</p>
      ))}


      {/* TASK 3 */}
      <h1 className="text-2xl font-bold mt-6">
        Available Courses
      </h1>

      <div className="flex gap-4 mt-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="border p-4 rounded"
          >
            <p>{course}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default App;