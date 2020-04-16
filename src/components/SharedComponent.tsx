import React from 'react';
import moment from 'moment';
import { get } from 'lodash';

const SharedComponent = () => {
  return (
    <div>
      {get([1, 2, 3], 0)}
      {moment().format()}
    </div>
  );
};

export default SharedComponent;
