import React, { Fragment, Suspense, lazy } from 'react';
import { Router, Link } from '@reach/router';
// import Time from './Time';
// import Calendar from './Calendar';
const Time = lazy(() => import('./Time'));
const Calendar = lazy(() => import('./Calendar'));

const App = () => {
  return (
    <Fragment>
      <div>
        <Link to="time">Time</Link>
      </div>
      <div>
        <Link to="calendar">Calendar</Link>
      </div>
      <Suspense fallback={<div>loading</div>}>
        {/* <Router> */}
        <Time path="time" />
        <Calendar path="calendar" />
        {/* </Router> */}
      </Suspense>
    </Fragment>
  );
};

export default App;
