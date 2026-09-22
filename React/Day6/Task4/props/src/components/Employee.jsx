

const Employee = ({employee}) => {

  return (<>
  <p>Name:{employee.name}</p>
  <p>Role:{employee.role}</p>
  <p> Salary:{employee.salary}</p>
  <p>City:{employee.city}</p>
  
  </>
  
  );
};

export default Employee;