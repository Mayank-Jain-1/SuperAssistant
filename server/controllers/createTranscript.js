const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const model = "whisper-1";
const Transcript = require("../models/transcript");

function createTranscript(audioURL, path) {

   axios
      .post(
         "https://api.openai.com/v1/audio/transcriptions",
         {
            model: model,
            file: fs.createReadStream(path),
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
               audioURL: audioURL,
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
