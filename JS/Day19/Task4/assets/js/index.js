const myFunction = async () => {
    const result = await Promise.resolve("Success");
    console.log(result);
};

myFunction();