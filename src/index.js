import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ClimbingProvider } from './contexts/ClimbingContext';
import App from './App';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <ClimbingProvider>
            <App />
        </ClimbingProvider>
    </BrowserRouter>,
    document.getElementById('root')
);