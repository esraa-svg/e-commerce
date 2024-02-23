import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/mdb-react-ui-kit/dist/mdb-react-ui-kit.cjs';
import Auth from "./Auth";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth />
  </React.StrictMode>
);                    


