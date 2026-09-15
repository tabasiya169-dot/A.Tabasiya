let students = [];

function addStudent() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;


    let student = {
        name: name,
        age: age,
        city: city
    };

    students.push(student);

    let container = document.getElementById("studentContainer");

    container.innerHTML = "";

    students.forEach(function(student) {

        let div = document.createElement("div");

        div.className = "student";

        div.innerHTML = `
            <h3>Student Details</h3>
            <p>Name: ${student.name}</p>
            <p>Age: ${student.age}</p>
            <p>City: ${student.city}</p>
        `;

        container.appendChild(div);
    });

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("city").value = "";
}