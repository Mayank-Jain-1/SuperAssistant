const checkTranscript = require('./controllers/checkTranscript');
const createTranscript = require('./controllers/createTranscript');

//making connection wtih mongodb
const mongoconnect = require("./connect/mongo");
mongoconnect();

//setting up express server
const express = require("express");
const app = express();
const PORT = 4000;
app.listen(PORT);

//setting up middlewares
app.use(express.json());
app.use((req, res, next) => {
   console.log(req.method + ":" + req.url + "\n");
   next();
});

checkTranscript("https://www.youtube.com/watch?v=xVgtcvw7P9A").then(res => {
   if(res === false){
      createTranscript("https://www.youtube.com/watch?v=xVgtcvw7P9A");
   }
   else{
      console.log("Found the transcript for the given URL");
   }
});




app.get('/', (req,res) =>{
   res.send("hello world");
})