import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import PageNotFount from "./pages/PageNotFount";
import Pricing from "./pages/Pricing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import PageNav from "./components/PageNav";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";

const URL_BASE = "http://localhost:8000";
function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      async function cityData() {
        try {
          setLoading(true);
          const res = await fetch(`${URL_BASE}/cities`);
          const data = await res.json();
          setCities(data);
          // console.log(data);
        } catch {
          alert("There was an error loading data");
        } finally {
          setLoading(false);
        }
      }
      cityData();
      console.log(cities);
    },

    []
  );
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />} />
          <Route path="/" element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isloading={loading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isloading={loading} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList cities={cities} isloading={loading} />}
            />
            <Route path="form" element={<p>List of forms</p>} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFount />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
