import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Details from "./components/Pages/Details";
import HomePage from "./components/Pages/HomePage";
import NotFoundPage from "./components/Pages/NotFoundPage";
import {ICountry} from "./types";

function App() {
  const [countries, setCountries] = useState<Array<ICountry>>([]);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route
            index
            element={
              <HomePage countries={countries} setCountries={setCountries} />
            }
          />
          <Route path="/country/:name" element={<Details />} />
          <Route path="/notfound" element={<NotFoundPage />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
