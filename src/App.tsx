import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Page404 from "./Page404";
import About from "./About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
