// import React from "react";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ButtonProvider } from "./context/ButtonProvider";
import { ProductProvider } from "./context/ProductProvider";
import { AdminProvider } from "./context/AdminContext";
import { HelmetProvider } from "react-helmet-async";
import { PageProvider } from "./context/PageProvider.jsx";
import { SocketProvider } from "./context/SocketProvider.jsx";
import { ProfilProvider } from "./context/ProfilContext.jsx";
import { MessageProvider } from "./context/MessageProvider.jsx";
import { ParticipantProvider } from "./context/ParticipantContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <ButtonProvider>
        <ProductProvider>
          <AdminProvider>
            <PageProvider>
              <SocketProvider>
                <ProfilProvider>
                  <MessageProvider>
                    <ParticipantProvider>
                      <BrowserRouter>
                        <App />
                      </BrowserRouter>
                    </ParticipantProvider>
                  </MessageProvider>
                </ProfilProvider>
              </SocketProvider>
            </PageProvider>
          </AdminProvider>
        </ProductProvider>
      </ButtonProvider>
    </AuthProvider>
  </HelmetProvider>
);
