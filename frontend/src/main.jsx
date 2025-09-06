import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import JobifyFavicon from "./assets/Jobify.png";

const link =
  document.querySelector("link[rel~='icon']") || document.createElement("link");
link.rel = "icon";
link.href = JobifyFavicon;
document.getElementsByTagName("head")[0].appendChild(link);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
