import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ClimbingStats from './ClimbingStats';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ClimbingStats />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});