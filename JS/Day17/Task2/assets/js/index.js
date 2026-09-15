let employees = [];

function addEmployee() {

    let name = document.getElementById("employeeName").value;
    let department = document.getElementById("department").value;
    let salary = document.getElementById("salary").value;

    let employee = {
        name: name,
        department: department,
        salary: salary
    };

    employees.push(employee);

    let table = document.getElementById("employeeTable");

    table.innerHTML = "";


    employees.forEach(function(employee) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
        `;

        table.appendChild(row);
    });

    document.getElementById("employeeName").value = "";
    document.getElementById("department").value = "";
    document.getElementById("salary").value = "";
}