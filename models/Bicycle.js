const { Schema , model , Types} = require('mongoose');


const bicycleSchema = new Schema ({
    name: { type: String , required: true , maxLength: 20 , unique: true},
    type: { type: String , enum: ["Road" , "MTB" , "Downhill"] , required: true},
    price: { type: Number , required: true },
    imageUrl: { type: String , required: true},
    description: { type: String , required: true },
    condition: { type: String , enum: ['new' , "used"] , required: true},
    usersBuying: { type: [Types.ObjectId], default: [], ref: 'Bicycle' },
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