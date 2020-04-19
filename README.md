## Situation 1
- 假设有**多**个组件，都引入了`moment`这个包，**单个**组件设置`moment`的lazy load,会使得`moment`单独打成包吗？
  - 不会, 引入了`moment`的**所有组件**必须全部设置lazy load，才能实现这样的需求


### Lazy Load Moment.js
- without hooks
```javascript
const Calendar = (props: RouteComponentProps) => {
  // 使用useState  
  const [time, setTime] = useState("0");

  // 使用useEffect
  useEffect(() => {
    const init = async () => {
      const module = await import('moment');
      setTime(module.default().format())
    };
    init();
  }, []);

  return (
    <div>
      <br />
      Calender: {time}
    </div>
  );
};
```
- with hooks
```javascript
import { useState, useEffect } from 'react';
import { Moment } from 'moment'; // won't break spliting moment out, just types

const useMoment = () => {
  const [moment, setMoment] = useState<Moment>();
  useEffect(() => {
    const getModule = async () => {
        const module = await import('moment');
        setMoment(module.default)
    };
    getModule();
  }, []);
  return [moment];
};

export default useMoment;
```

### Conclusion
- You can now do lazy load on **any** modules

## Situation 2
- 假设在引入moment的所有组件中全部实现了lazy load hooks，那一个页面引入moment后，进入其他页面，是不是还要重新request引入一次moment呢？
  - 初步猜想: 不会, js文件会被浏览器缓存，不会重新request