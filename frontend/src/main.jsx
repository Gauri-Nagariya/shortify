// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";
// import { CompanyContext } from './context/CompanyContext.jsx';
// import CompanyContextProvider from "./context/CompanyContext.jsx";
import UrlContextProvider from './context/UrlContext.jsx';


createRoot(document.getElementById('root')).render(
<AppContextProvider>
  <UrlContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UrlContextProvider>
</AppContextProvider>

)
