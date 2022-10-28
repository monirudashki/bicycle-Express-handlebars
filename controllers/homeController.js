const homeController = require('express').Router();

homeController.get('/' , (req , res) => {
    res.render('home' , {
        title: "Bicycle Home Page",
        footer: "Bicycle.com created by Simeon Rudashki"
    });
});

module.exports = homeController;