const user = {
    name: "Ravi"
};

const city = user?.city ?? "City Not Available";

console.log(city);