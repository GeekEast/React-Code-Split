import React from 'react';
import { RouteComponentProps } from '@reach/router';
import useMoment from './useMoment'

const Time = (props: RouteComponentProps) => {
  const [moment]= useMoment();
  return (
    <div>
      <br />
      Time: {moment?.format()}
    </div>
  );
};

export default Time;

