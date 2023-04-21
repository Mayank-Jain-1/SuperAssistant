//Setting up Dotenv
const dotenv = require("dotenv");
dotenv.config();

const checkTranscript = require("./controllers/checkTranscript");
const createTranscript = require("./controllers/createTranscript");

//importing the weaviate functions
const {
   addBatch,
   checkEmbeddingsExist,
   classExist,
   createClass,
} = require("./controllers/weaviateFunctions");

//making connection wtih mongodb
const mongoconnect = require("./connect/mongo");
mongoconnect();

//making connection to weaviate
const client = require("./connect/weaviate");
const youtubeURL = "https://www.youtube.com/watch?v=oL1uem6-3m4";
const path = "E:\\Coding\\Web\\SuperAssistant\\server\\assets\\service.mp3";
const className = "Finalpara";
//checking if the transcript exists
(async () => {
   const isTranscript = await checkTranscript(youtubeURL);
   if (isTranscript)
      console.log("Transcript for this youtube video found in MongoDB");
   else {
      console.log(
         "Didnt found the transcript. Trying to create and store in mongo"
      );
      createTranscript(youtubeURL, path);
   }
   const isClassExist = await classExist(className);
   if (!isClassExist) {
      console.log("This class not found. Creating ...");
      await createClass(className);
   }
   const isEmbedding = await checkEmbeddingsExist(className);
   if (!isEmbedding) {
      console.log("No Objects found so adding batch now ...");
      await addBatch(className, youtubeURL);
   }
})();

//setting up express server
const express = require("express");
const { createDBQAchain, getAnswer } = require("./controllers/DBQAchain");
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
   res.send("Hello from the express server");
});

app.post("/query", async (req, res) => {
   const dbqachain = await createDBQAchain(className, "content");
   const { question } = req.body;
   const answer = await getAnswer(dbqachain, question);
   res.status(200).json({
      answer: answer,
      status: res.statusCode
   });
});
