const homeController = require("../controllers/homeController");
const catalogController = require("../controllers/catalogController");
const authController = require("../controllers/authController");
const defaultController = require("../controllers/defaultController");
const createController = require("../controllers/createController");
const bicyclesController = require("../controllers/bicyclesController");
const profileController = require("../controllers/profileController");
const searchController = require("../controllers/searchController");

const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
     app.use('/' , homeController);
     app.use("/auth" , authController);
     app.use("/catalog", catalogController);
     app.use("/create", hasUser(), createController);
     app.use('/bicycles' , hasUser(), bicyclesController);
     app.use("/profile" ,hasUser(), profileController);
//   app.use("/accessories",hasUser(), accessoriesController);
     app.use("/search", hasUser(),searchController); 


     app.all('*' , defaultController);
};
