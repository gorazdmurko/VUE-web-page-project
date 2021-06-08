// https://www.w3schools.com/nodejs/nodejs_filesystem.asp
/* */

const fs = require('fs');

// create a JSON object
const users = [
    {
        "id": 1,
        "name": "John Doe",
        "age": 22
    },
    {
        "id": 2,
        "name": "Jason Newsted",
        "age": 52
    },
    {
        "id": 3,
        "name": "Package Json",
        "age": undefined
    },
    {
        "id": 4,
        "name": "Little Kid",
        "age": 4
    }
]

// convert JSON object to string
// const data = JSON.stringify(user);
const data = JSON.stringify(users, null, 4);


// write JSON string to a file
fs.writeFile('users.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});

// try {
//     fs.writeFileSync('user.json', data);
//     console.log("JSON data is saved.");
//     } catch (error) {
//     console.error(err);
// }

// read JSON object from file
fs.readFile('user.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
    const user = JSON.parse(data.toString());

    // print JSON object
    console.log(user);
});