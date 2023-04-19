const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const filepath = path.join(__dirname, "../assets/guitar.mp3");
const model = "whisper-1";
const Transcript = require("../models/transcript");

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
         if (res.status === 200) {
            const newTranscript = new Transcript({
               audioURL: "https://www.youtube.com/watch?v=xVgtcvw7P9A",
               transcriptText: res.data.text,
            });
            newTranscript
               .save()
               .then((res) => console.log(res))
               .catch((err) => console.error(err));
         }
      })
      .catch((err) => {
         console.log(err);
      });
}

module.exports = createTranscript;
