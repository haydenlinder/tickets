import seeder from "mongoose-seed";

const db = require('./config/keys').mongoURI;
const Organization = require('../models/Organization');
const Organizations = require('./organizations');
const User = require('./users');

const data = [
    {
        'model': 'User',
        'documents': [
            {
                'name': 'Doc1',
                'value': 200
            },
            {
                'name': 'Doc2',
                'value': 400
            }
        ]
    }
];









seeder.connect(db, () => {
    seeder.loadModels([User]);
    seeder.clearModels([User], () => {
        seeder.populateModels(data, () => {
            seeder.disconnect();
        });
    });
});