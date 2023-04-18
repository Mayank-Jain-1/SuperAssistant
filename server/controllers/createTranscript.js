const dotenv = require("dotenv")
dotenv.config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const filepath = path.join(__dirname, "./assets/guitar.mp3");
const model = "whisper-1";

function createTranscript() {
   axios
      .post(
         "https://api.openai.com/v1/audio/transcriptions",
         {
            model: model,
            file: fs.createReadStream(filepath),
         },
         {
            headers: {
               Authorization: `Bearer ${OPENAI_API_KEY}`,
               "Content-Type": `multipart/form-data`,
            },
         }
      )
      .then((res) => {
         const transcript = res.data.text;
         console.log(transcript);
      })
      .catch((err) => {
         console.log(err);
      });
}

module.exports = createTranscript