const weaviate = require("weaviate-ts-client");
const { WeaviateStore } = require("langchain/vectorstores/weaviate");
const getTranscript = require("../controllers/getTranscript");
const split = require("../controllers/textSplitter");
const { ChatVectorDBQAChain } = require("langchain/chains");
const { OpenAI } = require("langchain/llms/openai");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const client = weaviate.client({
   scheme: "https",
   host: "superassistant-fq1yuyzh.weaviate.network",
});

let classObj = {
   class: "Temp0",
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

const getSchema = () => {
   client.schema
      .getter()
      .do()
      .then((res) => {
         console.log(res);
      })
      .catch((err) => {
         console.error(err);
      });
};

const create = () => {
   client.schema
      .classCreator()
      .withClass(classObj)
      .do()
      .then((res) => {
         console.log(res);
      })
      .catch((err) => {
         console.error(err);
      });
};

const getter = () => {
   client.schema
      .classGetter()
      .withClassName("paragraph")
      .do()
      .then((res) => {
         console.log(res);
      })
      .catch((err) => {
         console.error(err);
      });
};

const getall = () => {
   client.graphql
      .aggregate()
      .withClassName("Temp0")
      .withFields("meta { count }")
      .do()
      .then((res) => {
         console.log(JSON.stringify(res, null, 2));
      })
      .catch((err) => {
         console.error(JSON.stringify(err, null, 2));
      });
};

const addObject = () => {
   client.data
      .creator()
      .withClassName("Paragraph")
      .withProperties({
         content: "This is a very long para. Source: trust me",
      })
      .do()
      .then((res) => {
         console.log(res);
         getall();
      })
      .catch((err) => {
         console.error(err);
      });
};

const addBatch = async () => {
   const transcript = await getTranscript(
      "https://www.youtube.com/watch?v=xVgtcvw7P9A"
   );
   const splitted_text = await split(transcript);
   const batch = splitted_text.map((content, index) => {
      return {
         class: "Temp0",
         properties: {
            content: content,
         },
      };
   });
   client.batch
      .objectsBatcher()
      .withObject(batch[0])
      .withObject(batch[1])
      .withObject(batch[2])
      .withObject(batch[3])
      .withObject(batch[4])
      .do()
      .then((res) => {
         console.log(res);
         getall();
      })
      .catch((err) => {
         console.error(err);
      });
};

const createVectorStore = async () => {
   const embedder = new OpenAIEmbeddings(process.env.OPENAIN_API_KEY);
   vectorstore = new WeaviateStore(embedder, {
      client: client,
      indexName: "Temp0",
      textKey: "content",
   });
   // console.log(vectorstore);
   const myOpenAI = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
   });
   const qa = ChatVectorDBQAChain.fromLLM(myOpenAI, vectorstore);
   query = "How to strum";
   // docs = qa()
   const res = await (qa._call({ question: query, chat_history: [] }));
   console.log(res);
};
////////////////////

// getSchema();
// addObject();
// addBatch();
// getall();
createVectorStore();
