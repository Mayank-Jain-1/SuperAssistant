const weaviate = require("weaviate-ts-client");

const client = weaviate.client({
   scheme: "https",
   host: "transcripts-0107kdc1.weaviate.network",
   headers: { "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY },
});

module.exports = client;
