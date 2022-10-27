const homeController = require('express').Router();

homeController.get('/' , (req , res) => {
    res.render('home' , {
        title: "Bicycle Home Page"
    });
});

module.exports = homeController;