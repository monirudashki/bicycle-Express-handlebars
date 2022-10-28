const { searchBicycle } = require('../services/bicycleService');

const searchController = require('express').Router();

searchController.get('/' , (req , res) => {
    res.render('search' , {
        title: "Search Page"
    })
});

searchController.post('/' , async (req , res) => {
    const name = req.body.name;
    const price = req.body.price;
    const condition = req.body.condition;

    const matches = await searchBicycle(name , price , condition);
  
    res.render('search' , {
        title: "Search Page",
        body: {
            name,
            price,
            condition
        },
        matches
    });
})
 
module.exports = searchController;