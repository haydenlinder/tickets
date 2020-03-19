const bcrypt = require('bcrypt');

// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

// bcrypt.genSalt(saltRounds, function (err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
//         // Store hash in your password DB.
//     });
// });


// bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//     // Store hash in your password DB.
// });


// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
//     // result == false
// });

const genHashedPassword = (plaintextPassword) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plaintextPassword, salt);
    return hash;
};

export { genHashedPassword };