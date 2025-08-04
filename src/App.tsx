import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Page404 from "./Page404";
import About from "./About";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router";
import PlanetCard from "./PlanetCard";
import { ThemeProvider } from "./ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/list/:pageNumber" element={<MainPage />}>
                <Route path=":planetId" element={<PlanetCard />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
