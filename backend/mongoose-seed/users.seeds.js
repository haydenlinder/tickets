const genPasswordDigest = require('../utilities/bcrypt_utils');

const userSeeds = {
    model: 'User',
    documents: [
        {
            firstName: "Demo",
            lastName: "User",
            email: "user@cats4humanity.org",
            orgHandle: "cats4humanity.org",
            password: genPasswordDigest("password")
        },
        {
            firstName: "Hayden",
            lastName: "Linder",
            email: "hayden@cats4humanity.org",
            orgHandle: "cats4humanity.org",
            password: genPasswordDigest("password")
        },
        {
            firstName: "Brad",
            lastName: "Nelson",
            email: "brad@cats4humanity.org",
            orgHandle: "cats4humanity.org",
            password: genPasswordDigest("password")
        },
        {
            firstName: "Joe",
            lastName: "Johnston",
            email: "joe@cats4humanity.org",
            orgHandle: "cats4humanity.org",
            password: genPasswordDigest("password")
        },
        {
            firstName: "Marshall",
            lastName: "Strong",
            email: "marshall@cats4humanity.org",
            orgHandle: "cats4humanity.org",
            password: genPasswordDigest("password")
        },
        {
            firstName: "Wiley",
            lastName: "Coyote",
            email: "wc@acme.boom",
            orgHandle: "acme.boom",
            password: genPasswordDigest("password")
        },
        {
            firstName: "Road",
            lastName: "Runner",
            email: "rr@acme.boom",
            orgHandle: "acme.boom",
            password: genPasswordDigest("password")
        },
        {
            firstName: "Marvin",
            lastName: "The Martian",
            email: "mtm@acme.boom",
            orgHandle: "acme.boom",
            password: genPasswordDigest("password")
        },
        {
            firstName: "Bugs",
            lastName: "Bunny",
            email: "bb@acme.boom",
            orgHandle: "acme.boom",
            password: genPasswordDigest("password")
        },
        {
            firstName: "Gmail",
            lastName: "User",
            email: "user@gmail.com",
            orgHandle: "gmail.com",
            password: genPasswordDigest("password")
        },
        {
            firstName: "Carlos",
            lastName: "Garcia",
            email: "carlos@appacademy.io",
            orgHandle: "appacademy.io",
            password: genPasswordDigest("password")
        },
    ]
};

module.exports = userSeeds;