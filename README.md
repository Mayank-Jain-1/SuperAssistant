# SuperAssistant

Link to deployed Website on Google Cloud Platform [SuperAssistant](https://superassisstant.uc.r.appspot.com/)

## What is SuperAssisstant
1. This is a chatbot which gives answer based on any given youtube video.
1. You can ask any question from the domain of the video given and you will get answer relevant to the context of the video.

## How it works?
1. It works by creating a transcript of the given youtube video.
1. It Stores the created transcript in mongodb
1. From there its embeddings are created and stored into a vector database.
1. It is then queried and you get answer from open ai's chatdbqachain.

## Technology / Stack 
1. This website uses MERN Stack.
1. In the backend it also uses Langchain framework to interact with OpenAI APIs and also using vectorstores.
1. Weaviate is chosen as the VectorDatabase for this project. 
1. TailwindCSS is used as CSS utility.

## WorkFlow
1. Using mongoose library a connection with mongodb is established.
1. First when the backend server is booted up it checks if the transcript for the given youtube video is already stored in MongoDB or not.
1. If not it creates a new transcript running the `https://api.openai.com/v1/audio/transcriptions` API and stores it into MongoDB.
1. A connection with Weaviate cloud service is made using `weaviate-ts-client`.
1. It is checked if the given name class is there in the schema of the made client.
1. If not a new Class is made with the option of a custom class definition or a default one. 
1. Then it is checked if there are embeddings stored into the class. 
1. If not then the given transript is broken into chunks using Langchain's `RecursiveCharacterTextSplitter`. 
1. Then using the already made client the batch of these newly made objects(from chunks class objects are made) is pushed into the class of the vector database Weaviate.
1. A new VectorStore is made from embedder made from OPENAI and the weaviateclient. 
1. Using this VectorStore a new `ChatVectorDBQAchain` is made using our favourite LLM (OpenAi) and the vectorstore.
1. Functions is made to be able to query the chain and return Answer.
1. Post api endpoint is made to take question as a body arguement and returns the answer as text.
1. This api is used in our React frontend which provides a simple UI to interact with the application.

## What i learnt from?
During the development of SuperAssistant, I gained knowledge and experience in several areas. These include:


1.MERN Stack: I learned how to use the MERN (MongoDB, Express.js, React.js, Node.js) stack to build web applications. I gained a good understanding of how the stack works, its advantages, and disadvantages. I also learned how to use TailwindCSS as a CSS utility.
1. Integration of OpenAI APIs: I learned how to integrate OpenAI APIs for natural language processing and how to use them to provide answers to users' questions based on a given YouTube video. I gained experience in using OpenAI's ChatVectorDBQAchain and how it works with Weaviate as the VectorDatabase.
1. Weaviate: I gained knowledge about using Weaviate as a VectorDatabase and how it works with OpenAI's embedder and ChatVectorDBQAchain.
1. Langchain: I learned how to use Langchain framework to interact with OpenAI APIs and VectorStores. I used Langchain's RecursiveCharacterTextSplitter to split transcripts into chunks and create objects for the VectorDatabase.
1. API Development: I gained experience in developing APIs using Express.js and Node.js. I learned how to create endpoints, handle requests and responses, and use middleware functions. I also learned how to use Postman for API testing.
1. Chatbot Development: I gained knowledge about how chatbots work and how they can be used to provide answers to user queries. I learned how to use OpenAI's ChatVectorDBQAchain to generate answers based on user queries.
1. Development Workflow: I learned how to use Git for version control and collaboration with other developers. I gained experience in using Github and managing pull requests. I also learned how to deploy the project on Google Cloud Platform.


Overall, this project provided me with valuable experience in building a chatbot using the MERN stack, integrating OpenAI APIs, and developing APIs. I gained a deeper understanding of how these technologies work together to create a functional web application.
