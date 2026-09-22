import Employee from "./components/Employee";


const App = () => {
  const employee={
    name:"Tabasiya",
    role:"Frontend Developer",
    salary:30000,
    city :"chennai"
  };


  return (<>
  <h1>Employeee Details</h1>
  <Employee
  employee={employee}/>
  </>
  );
};

export default App;