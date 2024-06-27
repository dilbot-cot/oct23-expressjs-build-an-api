// Make the .env data available for use
const dotenv = require('dotenv')
dotenv.config();

// Import express package and configure needed data
const express = require('express');
const app = express()

// Use environment variables for HOST and PORT, but also pass through defaults if not available.
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

// Configure basic Helmet settings on the server
const helmet = require('helmet')
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc:["'self'"]
    }
}))

const cors = require('cors')
var corsOptions = {
    origin: ["http://localhost:5000", "https://deployedApp.com"],
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

// Let the server use JSON and URLencoding data structures for data formatting
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mongoose = require('mongoose')
var databaseURL = "";
switch (process.env.NODE_ENV.toLowerCase()) {
    case "test":
        databaseURL = 'mongodb://localhost:27017/ExpressBuildAnAPI-test';
        break;
    case "development":
        databaseURL = 'mongodb://localhost:27017/ExpressBuildAnAPI-dev';
        break;
    case "production":
        databaseURL = process.env.DATABASE_URL
        break;
    default:
        console.error("Incorrect JS environment spercified, database will not be connected")
        break
}

const {databaseConnector} = require('./utils/database')
databaseConnector(databaseURL).then(() => {
    console.log("Database connected successfully!")
}).catch(error => {
    console.log(`
        Some error occured connecting to the database! It was:
        ${error}
        `)
})

app.get('/databaseHealth', (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    })
})

// Default homepage route
app.get('/', (request, response) => {
    response.json({
        message: "Hello World!"
    })
})

// Database dump of all info
app.get("/databaseDump", async (request, response) => {
    const dumpContainer = {};

    var collections = await mongoose.connection.db.listCollections().toArray();
    collections = collections.map((collection) => collection.name)

    for (const collectionName of collections) {
        let collectionData = await mongoose.connection.db.collection(collectionName).find({}).toArray();
        dumpContainer[collectionName] = collectionData;
        
    }
    console.log("Dumping all of this data to the client: \n" + JSON.stringify(dumpContainer, null, 4))

    response.json({
        data: dumpContainer
    })
})

// Default no route response, if a user attempts to use a route that has not been configured.
app.get('*', (request, response) => {
    response.status(404).json({
        message: "No route with that path found!",
        attemptedPath: request.path
    })
})

module.exports = {
    HOST,
    PORT,
    app
}