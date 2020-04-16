import React from 'react';
import SharedComponent from './SharedComponent';
import moment from 'moment';
import _ from 'lodash';

const MyComponent = () => {
  return (
    <div>
      {_.get([1,2,3],0)}
      {moment().format()}
      <SharedComponent></SharedComponent>
    </div>
  );
};

export default MyComponent;
