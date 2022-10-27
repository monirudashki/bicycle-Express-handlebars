const express = require("express");
const expressConfig = require("./config/express");
const databaseConfig = require("./config/database");
const routerConfig = require("./config/router");

start();

async function start() {
    const app = express();
    
    await databaseConfig(app);
    expressConfig(app);
    routerConfig(app);
    app.listen(3000 , () => console.log("Everything is good"));
}