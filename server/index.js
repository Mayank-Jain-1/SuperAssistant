//Setting up Dotenv
const dotenv = require("dotenv");
dotenv.config();

const checkTranscript = require("./controllers/checkTranscript");
const createTranscript = require("./controllers/createTranscript");

//making connection wtih mongodb
const mongoconnect = require("./connect/mongo");
mongoconnect();

//checking if the transcript exists
(async () => {
   const youtubeURL = "https://www.youtube.com/watch?v=xVgtcvw7P9A";
   const path = "E:\\Coding\\Web\\SuperAssistant\\server\\assets\\guitar.mp3";
   // const youtubeURL = "https://www.youtube.com/watch?v=oL1uem6-3m4";
   // const path = "E:\\Coding\\Web\\SuperAssistant\\server\\assets\\service.mp3";
   const isTranscript = await checkTranscript(youtubeURL);
   console.log(isTranscript)
   if (isTranscript)
      console.log("Transcript for this youtube video found in MongoDB");
   else {
      console.log("Didnt found the transcript. Trying to create and store in mongo")
      createTranscript(youtubeURL, path);
   }
})();

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
app.get("/", (req, res) => {
   res.send("hello world");
});
