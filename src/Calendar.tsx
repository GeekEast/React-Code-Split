import React from 'react'
import { RouteComponentProps } from '@reach/router';
import useMoment from './useMoment';

const Calendar = (props: RouteComponentProps) => {
    const [moment]= useMoment();
    return (
      <div>
        <br />
        Time: {moment?.format()}
      </div>
    );
  };

export default Calendar;


