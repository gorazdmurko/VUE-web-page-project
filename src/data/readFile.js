const fs = require('fs');

// let user = () => {
//     let users = [];
//     fs.readFile('user.json', 'utf-8', (err, data) => {
//         if (err) {
//             throw err;
//         }
//         const user = JSON.parse(data.toString());
//             users.push(user);
//     });
//     return user;
// }



function user() {
    let users = [];
    fs.readFile('user.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        const user = JSON.parse(data.toString());
        users.push(user);
    });
    return users;
}

export let users = user();