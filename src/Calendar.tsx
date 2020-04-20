import React from 'react'
import { RouteComponentProps } from '@reach/router';
import useMoment from './useMoment';
import useLodash from './useLodash';

const Calendar = (props: RouteComponentProps) => {
    const [moment]= useMoment();
    const [lodash] = useLodash();
    return (
      <div>
        <br />
        Calendar: {moment?.format()}
        Lodash: {lodash?.get([1,2,3],0)}
      </div>
    );
  };

export default Calendar;


