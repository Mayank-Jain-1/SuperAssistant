const {RecursiveCharacterTextSplitter} = require("langchain/text_splitter");

const split = async (text) => {
   const splittedText = await new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 0,
   }).splitText(text);
   return splittedText;
};

module.exports = split;
