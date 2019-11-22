import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ClimbDetails from './ClimbDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const climbLatLng = [{
        climbImage: 'TestImage.jpg', 
        climbName: 'TestName',
        climbType: 'Boulder',
        climbGrade: 'V0',
        climbUrl: 'http://TestUrl.com'
  }]


  const props = {
    location: {
        state: {
            climbArea: 'Test Area Name',
            climbLatLng: climbLatLng
        }
    }
}

  ReactDOM.render(
    <BrowserRouter>
      <ClimbDetails {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});