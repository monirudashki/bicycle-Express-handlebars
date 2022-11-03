const pagination = require('../middlewares/pagination');
const Bicycle = require('../models/Bicycle');

const { getAllBicycles, getAllType } = require('../services/bicycleService');

const catalogController = require('express').Router();

catalogController.get("/", pagination(), async (req , res) => { 
    let page = Number(res.locals.page);
    let limit = Number(res.locals.limit);
    const skip = (page - 1) * limit;
    let lastPage = Math.ceil((await getAllBicycles()).length / limit);
    
    let isNotFirstPage = page != 1;
    let isNotLastPage = page != lastPage
    
    const bicycles = await Bicycle.find().skip(skip).limit(limit).lean();
    
    res.render('catalog' , {
        title: "Catalog Page",
        h1: 'All Models',
        bicycles,
        isNotFirstPage,
        isNotLastPage,
        lastPage
    });
});

catalogController.get('/next' , pagination() , async (req , res) => {
    let page = res.locals.page;
    let limit = Number(req.query.limit);
    const skip = (page - 1) * limit;
    let lastPage = Math.ceil((await getAllBicycles()).length / limit);
    let isNotFirstPage = page != 1;
    let isNotLastPage = page != lastPage
  
    const bicycles = await Bicycle.find().skip(skip).limit(limit).lean();
    
    res.render('catalog' , {
        title: "Catalog Page",
        h1: 'All Models',
        bicycles,
        isNotFirstPage,
        isNotLastPage,
        lastPage
    });
});

catalogController.get('/previous' , pagination() , async (req , res) => { 
    let page = res.locals.page;
    let limit = Number(req.query.limit);
    const skip = (page - 1) * limit;
    let lastPage = Math.ceil((await getAllBicycles()).length / limit);
    let isNotFirstPage = page != 1;
    let isNotLastPage = page != lastPage
  
    const bicycles = await Bicycle.find().skip(skip).limit(limit).lean();

    res.render('catalog' , {
        title: "Catalog Page",
        h1: 'All Models',
        bicycles,
        isNotFirstPage,
        isNotLastPage,
        lastPage
    });
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