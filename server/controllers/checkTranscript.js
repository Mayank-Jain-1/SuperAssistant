const Transcript = require("../models/transcript");

const checkTranscript = async (audioURL) => {
   const res = await Transcript.findOne({
      audioURL: audioURL,
   })
      .then((res) => {
         if (res !== null) return true;
         return false;
      })
      .catch((err) => {
         console.log(err);
      });
   return res;
};

module.exports = checkTranscript;
