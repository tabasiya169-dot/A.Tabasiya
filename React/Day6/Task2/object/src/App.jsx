import React from 'react'

const App = () => {
   
    const student={
      name:"Tabasiya",
      age:21,
      course:"Full stack",
      city: "chennai"
    }

  return (<>
      <h1>Student details</h1>
      <p>Name:{student.name}</p>
      <p>Age:{student .age}</p>
      <p>Course:{student.course}</p>
      <p>City:{student.city}</p>
  
  </>
   
  );
};

export default App;