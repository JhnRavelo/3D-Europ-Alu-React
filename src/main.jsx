// import React from "react";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ButtonProvider } from "./context/ButtonProvider";
import { ProductProvider } from "./context/ProductProvider";
import { AdminProviser } from "./context/AdminContext";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <ButtonProvider>
        <ProductProvider>
          <AdminProviser>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AdminProviser>
        </ProductProvider>
      </ButtonProvider>
    </AuthProvider>
  </HelmetProvider>
);
