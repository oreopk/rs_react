import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Page404 from "./Page404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
