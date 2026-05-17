import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import BillingPage from "./pages/BillingPage";
import ProductsPage from "./pages/ProductsPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {

  // SEARCH STATE
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      {/* ROUTES */}
      <Routes>

        <Route
          path="/"
          element={
            <BillingPage
              search={search}
            />
          }
        />

        <Route
          path="/products"
          element={
            <ProductsPage
              search={search}
            />
          }
        />

        <Route
          path="/history"
          element={<HistoryPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}