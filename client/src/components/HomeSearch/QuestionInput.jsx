const QuestionInput = ({ question, setQuestion, className }) => {
   const handleChange = (e) => {
      setQuestion(e.target.value);
   };

   return (
      <div className={`${className}`}>
         <input
            type="text"
            onChange={handleChange}
            value={question}
            placeholder="Enter your question here..."
            className={`bg-charcoal border-2 border-black rounded-md text-white p-4 text-xl w-full outline-none`}
         />
      </div>
   );
};

export default QuestionInput;
