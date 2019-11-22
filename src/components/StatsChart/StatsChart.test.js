import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StatsChart from './StatsChart';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <StatsChart />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});