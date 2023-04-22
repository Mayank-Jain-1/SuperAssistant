const AskButton = ({ className, onClick }) => {
   return (
      <button className={`${className} bg-coolgray w-40 p-3 text-xl text-white rounded-md`} onClick={onClick}>
         Ask Query
      </button>
   );
};

export default AskButton;
