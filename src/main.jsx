import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { SupabaseProvider } from '@/contexts/SupabaseContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </>
);