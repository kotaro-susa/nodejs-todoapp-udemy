const mongoose = require("mongoose");

const connectDB = (url) =>{
    return mongoose
    .connect(url)
    .then(() => console.log("データベースと接続しました"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;