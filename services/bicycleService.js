const Bicycle = require("../models/Bicycle");
const User = require("../models/User");

async function getAllBicycles() {
    return Bicycle.find({}).lean();
};

async function getAllType(typeBicycle) {
    return Bicycle.find({type: typeBicycle}).lean();
}

async function getBicycleById(bicycleId) {
    return await Bicycle.findById(bicycleId).lean();
};

async function createBicycle(bicycleData , userId , errors) {
    const bicycleName = bicycleData.name;
    const existingName = await Bicycle.findOne({ name: bicycleName }).collation({ locale: 'en' , strength: 2});
    if(existingName) {
        return errors.push('Name is taken!');
    }
    const bicycle = {
        name: bicycleData.name,
        type: bicycleData.type,
        price: Number(bicycleData.price),
        imageUrl: bicycleData.imageUrl,
        description: bicycleData.description,
        condition: bicycleData.condition,
        owner: userId,
    };
    
    const result = await Bicycle.create(bicycle);

    return result;
};

async function updateBicycle(bicycleData , bicycleId) {
    const bicycle = await Bicycle.findById(bicycleId);
    
    bicycle.name = bicycleData.name;
    bicycle.type = bicycleData.type;
    bicycle.price = bicycleData.price;
    bicycle.imageUrl = bicycleData.imageUrl;
    bicycle.description = bicycleData.description;
    bicycle.condition = bicycleData.condition;


    await bicycle.save();
}

async function deleteBicycleById(bicycleId) {
    return await Bicycle.findByIdAndRemove(bicycleId);
}

async function buyBicycle(bicycleId , userId) {
    const bicycle = await Bicycle.findById(bicycleId);

    bicycle.usersBuying.push(userId);
    await bicycle.save();
};

async function getMyBicycles(userId) {
    return await Bicycle.find({ owner: userId}).lean();
}

async function searchBicycle(searchName) {
    if(searchName) {
       return await (Bicycle.find({ name: {$regex: searchName, $options: 'i'} }).lean());
    } else {
       return await Bicycle.find().lean();
    }
}

async function getMyOrderedBicycles(userId) {
    return await (Bicycle.find({ usersBuying: userId})).lean();
}

module.exports = {
    getAllBicycles,
    getBicycleById,
    createBicycle,
    getAllType,
    updateBicycle,
    deleteBicycleById,
    buyBicycle,
    getMyBicycles,
    searchBicycle,
    getMyOrderedBicycles
}