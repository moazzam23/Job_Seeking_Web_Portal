import mongoose from "mongoose";

export  const DBConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "Job_Seeking",
    })
    .then(() => {
      console.log(`Database connect to ${process.env.MONGO_URL}`);
    })
    .catch((err) => {
        console.log(` Error occur while connecting to ${err}`)
    });
};
