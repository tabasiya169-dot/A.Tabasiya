function studentDetails(name, course, city = "Chennai") {

    return `My name is ${name}. I am learning ${course}. I am from ${city}.`;
}

console.log(studentDetails("Ravi", "JavaScript"));
console.log(studentDetails("Arun", "JavaScript", "Madurai"));