const { Schema , model , Types} = require('mongoose');


const bicycleSchema = new Schema ({
    name: { type: String , required: true , maxLength: 20 , unique: true},
    type: { type: String , enum: ["Road" , "MTB" , "Downhill"] , required: true},
    price: { type: String , required: true },
    imageUrl: { type: String },
    description: { type: String , required: true , maxLength: 200},
    condition: { type: String , enum: ['New' , "Use"] , required: true},
    accessories: { type: [Types.ObjectId], default: [], ref: 'Accessories' },
    owner: { type: [Types.ObjectId] , ref: "User" , required: true}
});

bicycleSchema.index({ name: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Bicycle = model('Bicycle', bicycleSchema);

module.exports = Bicycle;