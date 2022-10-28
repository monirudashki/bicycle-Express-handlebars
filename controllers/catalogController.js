const { getAllBicycles, getAllType } = require('../services/bicycleService');

const catalogController = require('express').Router();


catalogController.get('/' , async (req , res) => {
    const bicycles = await getAllBicycles();

    res.render('catalog' , {
        title: "Catalog Page",
        h1: 'All Models',
        bicycles
    })
});

catalogController.get('/roadBikes' , async (req , res) => {
    const bicycles = await getAllType('Road');

    res.render('catalog' , {
        title: 'All Road Bikes',
        h1: 'Cycling',
        bicycles
    })
});

catalogController.get('/mtbBikes' , async (req , res) => {
    const bicycles = await getAllType('MTB');

    res.render('catalog' , {
        title: 'All MTB Bikes',
        h1: 'MTB',
        bicycles
    })
});

catalogController.get('/downhillBikes' , async (req , res) => {
    const bicycles = await getAllType('Downhill');

    res.render('catalog' , {
        title: 'All Downhill Bikes',
        h1: 'Downhill',
        bicycles
    })
});
module.exports = catalogController