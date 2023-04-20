const Weaviate = require("langchain/vectorstores/weaviate");
const OpenAI = require("langchain/llms/openai");
const 
const { VectorDBQAChain } = require("langchain/chains");
const weaviate = require("weaviate-ts-client");

const client = weaviate.client({
   scheme: 'https',
   host: 'https://superassistant-fq1yuyzh.weaviate.network'
})

client
  .schema
  .getter()
  .do()
  .then(res => {
  console.log(res);
  })
  .catch(err => {
  console.error(err)
  });


