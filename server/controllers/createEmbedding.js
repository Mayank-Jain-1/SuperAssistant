const { Chroma } = require("langchain/vectorstores/chroma");
const getTranscript = require("../controllers/getTranscript");
const split = require("./textSplitter");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

const embedder = new OpenAIEmbeddings(process.env.OPENAI_API_KEY);

const createChroma = async () => {
   const transcript = await getTranscript(
      "https://www.youtube.com/watch?v=xVgtcvw7P9A"
   );
   const splitted_text = await split(transcript);
   const indexes = splitted_text.map((x, index) => {
      return {
         id: index,
      };
   });

   Chroma.fromTexts(
      splitted_text,
      indexes,
      embedder,
      {
         collectionName: "goldel-escher-bach",
      }
   ).catch((error) => {console.log(error)});
};

// const checkChroma = async () => {
   
//    const transcript = await getTranscript(
//       "https://www.youtube.com/watch?v=xVgtcvw7P9A"
//    );
//    const splitted_text = await split(transcript);
//    const indexes = splitted_text.map((x, index) => {
//       return {
//          id: index,
//       };
//    });
//    const vectorStore = await Chroma.fromTexts(
//       splitted_text,
//       indexes,
//       embedder,
//       {
//          collectionName: "mj-superassistants",
//       }
//    );
//    // console.log('vectorStore: ', vectorStore);
//    // vectorStore.similaritySearch("")
//    // console.log(' vectorStore.similaritySearch(): ',  vectorStore.similaritySearch());
// };
// createChroma();
// checkChroma();
createChroma()
