import { useState } from "react";
import QuestionInput from "./QuestionInput";
import AskButton from "./AskButton";
import axios from 'axios'

const QuestionArea = ({ className }) => {
   const [question, setQuestion] = useState("");
   const [answer, setAnswer] = useState("")

   const handleAsk = async () => {
      setAnswer('Getting your answer...');
      const res = await axios.post('/api/query', {
         question: question
      })
      if(res.data.status === 200){
         setAnswer(res.data.answer);
      }else{
         setAnswer("Was Not able to get your answer please try again.")
      }
   }
   return (
      <div className={`${className} my-4`}>
         <h2 className="text-4xl text-thistle text-center">
            Lets clear all your doubts regarding this Video.
         </h2>
         <div className="flex w-full items-center space-x-5">
            <QuestionInput
               className="my-5 w-full"
               question={question}
               setQuestion={setQuestion}
            />
            <AskButton onClick={handleAsk}/>
         </div>
         <p className="p-3 text-thistle text-2xl font-semibold">{">>"}{answer}</p>
      </div>
   );
};

export default QuestionArea;
