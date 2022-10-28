const createController = require("express").Router();

const User = require("../models/User");
const { createBicycle } = require("../services/bicycleService");


createController.get('/' , (req , res) => {
    res.render('create' , {
        title: "Create Page"
    });
});

createController.post('/' , async (req ,res) => {
    const userId = req.user.id;

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
    
        const result = await createBicycle(bicycleData, userId , errors);

        const user = await User.findById(userId);
        user.bicycles.push(result._id);
        await user.save();
        
        res.redirect("/catalog");
      } catch (error) {
        console.log(error);
        res.render("create", {
          title: "Request Error",
          body: {
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
})

module.exports = createController;