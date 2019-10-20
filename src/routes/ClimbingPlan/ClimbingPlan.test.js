import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ClimbingPlan from './ClimbingPlan';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ClimbingPlan />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});