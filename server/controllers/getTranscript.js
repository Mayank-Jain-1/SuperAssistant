const Transcript = require("../models/transcript");
const mongoconnect = require("../connect/mongo");
mongoconnect();

const getTranscript = async (audioURL) => {
   const res = await Transcript.findOne({
      audioURL: audioURL,
   })
      .then((res) => {
         return res
      })
      .catch((err) => {
         console.log(err);
      });
   return res.transcriptText;
};

module.exports = getTranscript;
