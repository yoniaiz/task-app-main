const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("process.env.MONGODB_URL",process.env.MONGODB_URL);
  try {
    mongoose.connect(
      process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
      (err) => {
        if (err) {
          return console.log("err ", err);
        }
        console.log("====================================");
        console.log("mongoose has connected");
        console.log("====================================");
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
