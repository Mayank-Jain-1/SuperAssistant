import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeSearch from "./pages/HomeSearch";

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<HomeSearch />} />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
