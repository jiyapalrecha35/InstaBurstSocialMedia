const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://amoghasdodawad:amoghasdodawad@cluster0.acfo3jk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Connected to DB')

    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;