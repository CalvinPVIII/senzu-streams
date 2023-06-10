import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./css/index.css";
import theme from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
