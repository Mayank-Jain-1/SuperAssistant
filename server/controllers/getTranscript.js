const Transcript = require("../models/transcript");
const mongoconnect = require("../connect/mongo");

const getTranscript = async (audioURL) => {
   await mongoconnect();
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
