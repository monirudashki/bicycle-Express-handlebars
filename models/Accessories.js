const { Schema , model } = require('mongoose');


const accessoriesSchema = new Schema ({
    name: { type: String , required: true},
    imageUrl: { type: String , required: true},
});

const Accessories = model("Accessories" , accessoriesSchema);

module.exports = Accessories;