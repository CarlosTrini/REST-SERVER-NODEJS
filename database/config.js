const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
    });
    console.log("base de datos conectada");
  } catch (error) {
    console.log(error);
    throw new Error("error la momento de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
