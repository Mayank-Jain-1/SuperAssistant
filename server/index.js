const checkTranscript = require("./controllers/checkTranscript");
const createTranscript = require("./controllers/createTranscript");

//making connection wtih mongodb
const mongoconnect = require("./connect/mongo");
mongoconnect();

//checking if the transcript exists 
checkTranscript("https://www.youtube.com/watch?v=oL1uem6-3m4").then((res) => {
   if (res === false) {
      createTranscript(
         "https://www.youtube.com/watch?v=oL1uem6-3m4",
         "E:\\Coding\\Web\\SuperAssistant\\server\\assets\\service.mp3"
      );
   } else {
      console.log("Found the transcript for the given URL");
   }
});

checkEmbeddings("Servicenow")

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
