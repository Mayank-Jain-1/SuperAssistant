const dotenv = require('dotenv').config();
const mongoose = require('mongoose')
const uri = `mongodb+srv://mayank:${process.env.MONGO_PASSWORD}@cluster0.xcyjamv.mongodb.net/transcripts?retryWrites=true&w=majority`


const connect = async () => {
   try{
      await mongoose.connect(uri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
      console.log("Connected to mongoose");
   }
   catch(err) {
      console.log(err);
      console.log("Couldnt connect to mongoose");
   }

}

module.exports = connect;