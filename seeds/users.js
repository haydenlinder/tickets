import seeder from "mongoose-seed";

const db = require('./config/keys').mongoURI;

const Organization = require('');
const User = require('../models/User');

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