import seeder from "mongoose-seed";

const db = require('./config/keys').mongoURI;

const Organization = require('');
const User = require('../models/User');

const organizationSeeds = {
    'model': 'Organization',
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
};

export default organizationSeeds;
