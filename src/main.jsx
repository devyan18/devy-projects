import SessionProvider from './providers/SessionProvider';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import './assets/css/index.css';
import './assets/css/text.css';
import './assets/css/card.css';
import './assets/css/tooltip.css';
import './assets/css/dropdown.css';
import './assets/css/icons.css';
import './index.css';

const element = document.getElementById('root');

const queryClient = new QueryClient();

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <App />
      </SessionProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
