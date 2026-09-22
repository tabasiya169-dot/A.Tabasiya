import React from 'react'

const App = () => {

  const courses=[
    "HTML",
    "CSS",
    "JS",
    "React",
    "Python"
  ];

  return (<>
     <h1>Course</h1>
     {courses.map((course,index)=>(
      <p key={index}>{course}</p>
     ))}


  </>
   
  );
};

export default App;