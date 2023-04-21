const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const fs = require("fs");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const model = "whisper-1";
const Transcript = require("../models/transcript");

const createTranscript = async (audioURL, path) => {
   const res = await axios
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
      .then(async (res) => {
         if (res.status === 200) {
            const newTranscript = new Transcript({
               audioURL: audioURL,
               transcriptText: res.data.text,
            });
            const response = await newTranscript
               .save()
               .then(() => {
                  return true;
               })
               .catch((err) =>{
                  console.error(err);
                  return false;
               } );
            return response
         }
      })
      .catch((err) => {
         console.log(err);
         return false
      });
   if(res){
      console.log("Created transcript and saved on mongo successfully.")
   }
   else{
      console.log("Couldnt save the transcript")
   }
   return res;
};

module.exports = createTranscript;
