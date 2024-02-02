import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
 import { BrowserRouter } from 'react-router-dom'
import Header from './Component/Header.js'
import 'bootstrap/dist/css/bootstrap.min.css';


 
// Import your publishable key
const PUBLISHABLE_KEY = 'pk_test_Z3JlYXQtaHVtcGJhY2stMjEuY2xlcmsuYWNjb3VudHMuZGV2JA'; 
const GOOGLEMAP_KEY= 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';
console.log("PUBLISHABLE_KEY:", PUBLISHABLE_KEY);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Header />
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);