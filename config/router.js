const homeController = require("../controllers/homeController");
const catalogController = require("../controllers/catalogController");
const authController = require("../controllers/authController");
const defaultController = require("../controllers/defaultController");
const createController = require("../controllers/createController");
const bicyclesController = require("../controllers/bicyclesController");
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
     app.use('/' , homeController);
     app.use("/auth" , authController);
     app.use("/catalog", catalogController);
     app.use("/create", hasUser(), createController);
     app.use('/bicycles' , hasUser(), bicyclesController);
//   app.use("/accessories",hasUser(), accessoriesController);
//   app.use("/search", hasUser(),searchController);
//   app.user("/profile" ,hasUser(), profileController);
//   app.user('/card',hasUser(), cardController);

     app.all('*' , defaultController);
};
