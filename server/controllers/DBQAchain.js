const client = require('../connect/weaviate');
const { ChatVectorDBQAChain } = require("langchain/chains");
const { OpenAI } = require("langchain/llms/openai");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { WeaviateStore } = require("langchain/vectorstores/weaviate");

const createDBQAchain = async (className, property) => {
   const embedder = new OpenAIEmbeddings(process.env.OPENAI_API_KEY);
   vectorstore = new WeaviateStore(embedder, {
      client: client,
      indexName: className,
      textKey: property,
   });
   const myOpenAI = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
   });
   const dbqachain = await ChatVectorDBQAChain.fromLLM(myOpenAI, vectorstore);
   return dbqachain;
};

const getAnswer = async (dbqachain, query) => {
   const res = await dbqachain._call({ question: query, chat_history: [] });
   console.log(res.text);
   return res.text;
};

module.exports = {createDBQAchain, getAnswer}
