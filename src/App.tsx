import { Suspense } from 'react';
import './App.css';
import Loader from './components/Loader.tsx';
import Page_co2 from './components/Page_co2.tsx';
function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Page_co2 />
      </Suspense>
    </>
  );
}

export default App;
