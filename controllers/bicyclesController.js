const { getUser } = require('../services/authServise');
const { getBicycleById, updateBicycle, deleteBicycleById, buyBicycle } = require('../services/bicycleService');

const bicyclesController = require('express').Router();


bicyclesController.get('/:id/details', async (req , res) => {
     const bicycle = await getBicycleById(req.params.id);
    
     if(bicycle.owner == req.user.id) {
        bicycle.isOwner = true;
      } else if(bicycle.usersBuying.map(b => b.toString()).includes(req.user.id)) {
        bicycle.isBuy = true;
      }

     res.render('details' , {
        title: "Details page",
        bicycle
     })
});

bicyclesController.get('/:id/edit' , async (req , res) => {
    const bicycle = await getBicycleById(req.params.id);
    const bicycleId = req.params.id;
    const userId = req.user.id;

    if(bicycle.owner != userId) {
        return res.redirect('/auth/login');
     }

    res.render('edit' , {
        title: "Edit Page",
        bicycle
    })
});

bicyclesController.post('/:id/edit' , async (req , res) => {
    const bicycleId = req.params.id;
    const userId = req.user.id;
    const bicycle = await getBicycleById(bicycleId);

    if(bicycle.owner != userId) {
        return res.redirect('/auth/login');
     }

    const name = req.body.name.trim();
    const type = req.body.type;
    const price = Number(req.body.price.trim());
    const imageUrl = req.body.imageUrl.trim();
    const description = req.body.description.trim();
    const condition = req.body.condition;

    const errors = [];

    try {
        if (name.length > 20 || name == "") {
            errors.push("Name must be between 1 and 20 characters!");
        }

        if(price < 0.01) {
            errors.push("Price must be positive number")
        }
    
        if (description.length < 10) {
          errors.push("Description should be at least 10 characters");
        }
    
        if (
          !imageUrl.startsWith("http") &&
          !imageUrl.startsWith("https")
        ) {
          errors.push("ImageUrl must be a valid url");
        }

        const bicycleData = {
            name,
            type,
            price,
            imageUrl,
            description,
            condition
        }

        if(errors.length > 0) {
            throw errors;
        }
    
        await updateBicycle(bicycleData, req.params.id , errors);
        
        res.redirect(`/bicycles/${bicycleId}/details`); 
      } catch (error) {
        console.log(error);
        res.render("edit", {
          title: "Request Error",
          bicycle: {
            name,
            type,
            price,
            imageUrl,
            description,
            condition
          },
          error
        });
      }
});

bicyclesController.get('/:id/delete' , async (req , res) => {
    const bicycle = await getBicycleById(req.params.id);
    const userId = req.user.id;

    if(bicycle.owner != userId) {
        return res.redirect('/auth/login');
     }

    const userProfile = await getUser(bicycle.owner.toString());
    const index = userProfile.bicycles.indexOf(req.params.id.toString());

    userProfile.bicycles.splice(index, 1);

    await userProfile.save();

    await deleteBicycleById(req.params.id);
    res.redirect('/catalog');
});

bicyclesController.get('/:id/buy' , async (req , res) => {
    const bicycleId = req.params.id;
    const bicycle = await getBicycleById(bicycleId);
    const userId = req.user.id
    
    if(bicycle.owner == userId) {
       return res.redirect('/catalog');
    }
  
    await buyBicycle(bicycleId , userId);
    res.redirect(`/bicycles/${bicycleId}/details`);
})



module.exports = bicyclesController;