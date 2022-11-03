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

    let matches = await searchBicycle(name);

    if(price) {
        matches = matches.filter(x => x.price < price);
    }

    matches = matches.filter(bike => bike.condition == condition);
  
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