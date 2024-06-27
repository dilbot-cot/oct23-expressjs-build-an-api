const mongoose = require('mongoose')
const { databaseConnector, databaseClear, databaseDisconnector} = require('./database')

// Import models required for seeding
const { Role, User, Post } = require('../models/models')

const dotenv = require('dotenv')
dotenv.config();

async function seedRoles() {
    const roles = [
        {
            name: 'regular',
            description: 'A regular user can view, create and read data. They can edit and delete only their own data.'
        },
        {
            name: 'admin',
            description: 'An admin user has full access and permissiones to do anything and everything within this API.'
        },
        {
            name: 'banned',
            description: 'A banned user can read data, but cannot do anything else.'
        }
    ];

    let result = await Role.insertMany(roles)
    console.log(result)
    return result
}

const users = [

]

const posts = [

]

var databaseURL = "";
switch (process.env.NODE_ENV.toLowerCase()) {
    case "test":
        databaseURL = "mongodb://localhost:27017/ExpressBuildAnAPI-test";
        break;
    case "development":
        databaseURL = "mongodb://localhost:27017/ExpressBuildAnAPI-dev";
        break;
    case "production":
        databaseURL = process.env.DATABASE_URL;
        break;
    default:
        console.error("Incorrect JS environment specified, database will not be connected.");
        break;
}

async function seed() {
    await databaseConnector(databaseURL)
    await databaseClear()

    let newRoles = await seedRoles();
    console.log("Seeded the data!")
    await databaseDisconnector();
}

seed()