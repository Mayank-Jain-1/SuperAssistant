const dotenv = require("dotenv").config();
const client = require("../connect/weaviate");
const getTranscript = require("./getTranscript");
const split = require("./textSplitter");

const defaultClass = {
   class: "Default",
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

const classExist = async (className) => {
   const res = await client.schema
      .getter()
      .do()
      .then((res) => {
         // console.log(res.classes);
         const x = res.classes.filter((obj) => obj.class === className);
         if (x.length !== 0) return true;
         else return false;
      })
      .catch((err) => {
         console.error(err);
         return false;
      });
   return res;
};

const createClass = (name, classObj) => {
   if (!name && !classObj) {
      classObj = defaultClass;
   } else if (name && !classObj) {
      classObj = {
         class: name,
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
   }
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

const checkEmbeddingsExist = (name) => {
   const res = client.graphql
      .aggregate()
      .withClassName(name)
      .withFields("content {count}")
      .do()
      .then((res) => {
         console.log(JSON.stringify(res, null, 2));
         const count = res.data.Aggregate[name][0].content.count;
         if (count > 0) return true;
         else return false;
      })
      .catch((err) => {
         console.error(JSON.stringify(err, null, 2));
         return false;
      });
   return res;
};

const addBatch = async (className, url) => {
   const transcript = await getTranscript(url);
   const splitted_text = await split(transcript);
   const batch = splitted_text.map((content, index) => {
      return {
         class: className,
         properties: {
            content: content,
         },
      };
   });
   let myclient = client.batch.objectsBatcher();
   batch.map((obj) => {
      myclient = myclient.withObject(obj);
   });
   myclient
      .do()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
};

module.exports = { classExist, createClass, checkEmbeddingsExist, addBatch };
