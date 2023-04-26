const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnect = async () => {
  try {
    mongoose.connect(
    "mongodb+srv://tom:1234@cluster0.gvnvvvc.mongodb.net/EmployeeData?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,

        useUnifiedTopology: true,
      },
      (error) => {
        if (error) {
          console.log("MongoDb is not connected successfully");
        } else {
          console.log("MongoDb is connected successfully");
        }
      }
    );
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};


module.exports = dbConnect;
