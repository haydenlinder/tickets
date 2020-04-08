const genPasswordDigest = require('../utilities/bcrypt_utils');

const userSeeds = {
  model: 'User',
  documents: [
    {
      _id: "000000000000000000000000",
      firstName: "Demo",
      lastName: "User",
      email: "user@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "111111111111111111111111",
      firstName: "Hayden",
      lastName: "Linder",
      email: "hayden@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "222222222222222222222222",
      firstName: "Brad",
      lastName: "Nelson",
      email: "brad@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "333333333333333333333333",
      firstName: "Joe",
      lastName: "Johnston",
      email: "joe@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "444444444444444444444444",
      firstName: "Marshall",
      lastName: "Strong",
      email: "marshall@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "aaaaaaaaaaaaaaaaaaaaaaaa",
      firstName: "Wiley",
      lastName: "Coyote",
      email: "wc@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "bbbbbbbbbbbbbbbbbbbbbbbb",
      firstName: "Road",
      lastName: "Runner",
      email: "rr@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "cccccccccccccccccccccccc",
      firstName: "Marvin",
      lastName: "The Martian",
      email: "mtm@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "ccccccccccccccccccccccc1",
      firstName: "Gmail",
      lastName: "User",
      email: "user@gmail.com",
      orgHandle: "gmail.com",
      password: genPasswordDigest("password")
    },
    {
      _id: "ccccccccccccccccccccccc2",
      firstName: "Baby",
      lastName: "Shark",
      email: "babyshark@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "ccccccccccccccccccccccc3",
      firstName: "Mommy",
      lastName: "Shark",
      email: "mommyshark@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "ccccccccccccccccccccccc4",
      firstName: "Daddy",
      lastName: "Shark",
      email: "daddyshark@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "ccccccccccccccccccccccc5",
      firstName: "Baby",
      lastName: "Squid",
      email: "babysquid@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "ccccccccccccccccccccccc6",
      firstName: "Mommy",
      lastName: "Squid",
      email: "mommysquid@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "ccccccccccccccccccccccc7",
      firstName: "Daddy",
      lastName: "Squid",
      email: "daddysquid@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "ccccccccccccccccccccccc8",
      firstName: "Foo",
      lastName: "Bar",
      email: "foobar@cats4humanity.org",
      orgHandle: "cats4humanity.org",
      password: genPasswordDigest("password")
    },
    {
      _id: "999999999999999999999999",
      firstName: "Carlos",
      lastName: "Garcia",
      email: "carlos@appacademy.io",
      orgHandle: "appacademy.io",
      password: genPasswordDigest("password")
    }
  ]
};

module.exports = userSeeds;
