import React, { Suspense,lazy } from 'react';
const MyComponent = lazy(() => import('./MyComponent'))
const ShitComponent = lazy(() => import('./ShitComponent'))
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading</div>}>
        <MyComponent/>
        <ShitComponent/>
      </Suspense>
    </div>
  );
}

export default App;
