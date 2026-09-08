import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CompareProducts from "./pages/CompareProducts";
import SmoothScroll from "./components/ScrollSmooth";

const App = () => {
  const [compareProducts, setCompareProducts] = useState([]);

  return (
    <BrowserRouter>
      <SmoothScroll />
      <div className="d-flex flex-column min-vh-100">

        {/* Navbar */}
        <Navbar compareProducts={compareProducts} />

        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  compareProducts={compareProducts}
                  setCompareProducts={setCompareProducts}
                />
              }
            />

            <Route
              path="/products/:slug"
              element={<ProductDetails />}
            />

            <Route
              path="/compare"
              element={
                <CompareProducts
                  products={compareProducts}
                />
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
};

export default App;