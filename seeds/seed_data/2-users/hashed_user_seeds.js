const genHashedPassword = require('../../../backend_utils/bcrypt_utils');

const userSeeds = [
    {
        firstName: "Demo",
        lastName: "User",
        email: "user@cats4humanity.org",
        organization: "cats4humanity.org",
        password: "password"
    },
    {
        firstName: "Hayden",
        lastName: "Linder",
        email: "hayden@cats4humanity.org",
        organization: "cats4humanity.org",
        password: "password"
    },
    {
        firstName: "Brad",
        lastName: "Nelson",
        email: "brad@cats4humanity.org",
        organization: "cats4humanity.org",
        password: "password"
    },
    {
        firstName: "Joe",
        lastName: "Johnston",
        email: "joe@cats4humanity.org",
        organization: "cats4humanity.org",
        password: "password"
    },
    {
        firstName: "Marshall",
        lastName: "Strong",
        email: "marshall@cats4humanity.org",
        organization: "cats4humanity.org",
        password: "password"
    },
    {
        firstName: "Seeded",
        lastName: "User",
        email: "seeded-user@cats4humanity.org",
        organization: "cats4humanity.org",
        password: "password"
    },
    {
        firstName: "ACME",
        lastName: "User",
        email: "email@address",
        organization: "address",
        password: "password"
    },
    {
        firstName: "gmail",
        lastName: "User",
        email: "user@gmail.com",
        organization: "gmail.com",
        password: "password"
    },
    {
        firstName: "Carlos",
        lastName: "Garcia",
        email: "carlos@appacademy.io",
        organization: "appacademy.io",
        password: "password"
    },
    {
        firstName: "Julia",
        lastName: "Wang",
        email: "julia@appacademy.io",
        organization: "appacademy.io",
        password: "password"
    },
    {
        firstName: "Mike",
        lastName: "Madsen",
        email: "mike@appacademy.io",
        organization: "appacademy.io",
        password: "password"
    },
];

let hashedUserSeeds = Object.assign({}, userSeeds);

hashedUserSeeds = userSeeds.map(
    document => {
        document.password = genHashedPassword(document.password)
    }
);

module.exports = hashedUserSeeds;