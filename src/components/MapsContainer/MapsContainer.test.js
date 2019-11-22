import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MapsContainer from './MapsContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MapsContainer />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});