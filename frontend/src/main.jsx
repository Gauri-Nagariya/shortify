import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import AppContextProvider from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";
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
