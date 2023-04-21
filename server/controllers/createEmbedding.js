const { WeaviateStore } = require("langchain/vectorstores/weaviate");
const getTranscript = require("../controllers/getTranscript");
const split = require("../controllers/textSplitter");
const { ChatVectorDBQAChain } = require("langchain/chains");
const { OpenAI } = require("langchain/llms/openai");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

const client = require("../connect/weaviate");

const classObj = {
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

const createClass = () => {
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

// const getter = () => {
//    client.schema
//       .classGetter()
//       .withClassName("Paragraph")
//       .do()
//       .then((res) => {
//          console.log(res);
//       })
//       .catch((err) => {
//          console.error(err);
//       });
// };

const getClassItemsLength = (name) => {
   const res = client.graphql
      .aggregate()
      .withClassName(name)
      .withFields("content {count}")
      .do()
      .then((res) => {
         const response = JSON.stringify(res, null, 2);
         const count = res.data.Aggregate[name][0].content.count;
         if(count > 0) return true;
      })
      .catch((err) => {
         console.error(JSON.stringify(err, null, 2));
         return false;
      });
   return res;
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
         class: "Paragraph",
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
         // getall();
      })
      .catch((err) => {
         console.error(err);
      });
};

const createVectorStore = async () => {
   const embedder = new OpenAIEmbeddings(process.env.OPENAI_API_KEY);
   vectorstore = new WeaviateStore(embedder, {
      client: client,
      indexName: "Paragraph",
      textKey: "content",
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
////////////////////

getSchema();
// create()
// addObject();
// addBatch();
// getall();

// (async () => {
//    const x = await getClassItemsLength("Paragraph");
//    console.log('x: ', x);
//    const mychain = await createVectorStore();
//    const query = "Who is the speaker??";
//    await getAnswer(mychain, query)
// })();
