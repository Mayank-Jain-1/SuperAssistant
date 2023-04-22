import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <div className="px-5">
         <div className="flex justify-between items-center  border-b border-coolgray py-5">
            <Link to="/" className="text-thistle text-4xl font-serif">
               Super Assistant
            </Link>
            <button className="text-thistle text-xl px-3 py-2 border border-thistle rounded-md">
               Login
            </button>
         </div>
      </div>
   );
};

export default Navbar;
