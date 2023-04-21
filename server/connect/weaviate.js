const weaviate = require("weaviate-ts-client");

const client = weaviate.client({
   scheme: "https",
   host: "transcripts-0107kdc1.weaviate.network",
   headers: { "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY },
});

module.exports = client;

let classObj = {
   class: "Paragraph",
   description: "A paragraph from the video transcript",
   vectorizer: "text2vec-openai",
   moduleConfig: {
      "text2vec-openai": {
         vectorizeClassName: true,
      },
   },
   properties: [
      {
         dataType: ["text"],
         description: "The content of the article",
         name: "content",
      },
   ],
};
