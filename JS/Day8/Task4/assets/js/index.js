

const printStudentsAbove80 = () => {
    let students = [
        { name: "Arun", mark: 85 },
        { name: "Priya", mark: 75 },
        { name: "Kavin", mark: 90 },
        { name: "Divya", mark: 68 },
        { name: "Rahul", mark: 82 }
    ];

    for (let i = 0; i < students.length; i++) {
        if (students[i].mark > 80) {
            console.log(students[i].name);
        }
    }
};

printStudentsAbove80();