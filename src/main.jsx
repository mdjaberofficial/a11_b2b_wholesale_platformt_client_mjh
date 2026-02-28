import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes/Routes';
import AuthProvider from './contexts/AuthProvider';
import './index.css'; // This must import your Tailwind CSS directives

// src/main.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);