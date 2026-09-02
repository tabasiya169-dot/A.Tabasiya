function loadData() {

    return new Promise((resolve) => {

        setTimeout(() => {
            resolve("Data Loaded");
        }, 2000);

    });
}


// Using then()
loadData().then((data) => {
    console.log(data);
});


// Using async/await
async function getData() {

    const result = await loadData();

    console.log(result);
}

getData();