<style>
table {
margin: auto;
border: 1px solid red
}
</style>

## Lazy Load Components
### React lazy and Suspense
- Declare `Suspense` and `fallback`
```javascript
import { Suspense } from 'react';
// 只需要使用一次Suspense
<Suspense fallback={Fallback}>
  <Router>
  ...
  </Router>
</Suspense>  
```
- Use `lazy` to import components
```javascript
// anywhere inside the Router
const MyComponent = React.lazy(() => import("./MyComponent"))
```
### Lodable
```javascript
import Loadable from 'react-loadable'

const MyComponent = Loadable({
  loader: () => import("./MyComponent"),
  loading: Fallback
})
```

### Compare
- **Tie**: `lazy` and `Suspense` is embeded in React, no extra cost to import, but the size of `Loadable` is very small as well.
- **React wins**: `1 suspense 1 fallback` vs `1 loadable 1 fallback`
- **Loadable wins**: You don't need `Suspense` for loadable
- **Loadable wins**: Loadable gives more features like error handling, prefetch
> Conclusion: Loadable is just an **encapsulation** of `lazy` and `Suspense`


## Lazy Load Modules

### Situation 1
- 假设有**多**个组件，都引入了`moment`这个包，**单个**组件设置`moment`的lazy load,会使得`moment`单独打成包吗？
  - 不会, 引入了`moment`的**所有组件**必须全部设置lazy load，才能实现这样的需求


#### Lazy Load Moment.js
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
#### Merge Modules
- merge `moment.js` and `lodash.js` together, any chunkname you want
```javascript
import(/* webpackChunkName: "my_lib" */ 'moment');
import(/* webpackChunkName: "my_lib" */ 'lodash');
```
> if you want them `separate`, just remove the comments! Easy!

#### Conclusion
- You can now do lazy load on **any** modules

### Situation 2
- 假设在引入moment的所有组件中全部实现了lazy load hooks，那一个页面引入moment后，进入其他页面，是不是还要重新request引入一次moment呢？
  - 初步猜想: 不会, js文件会被浏览器缓存，不会重新request

## Practice
- **首先**, 通过`source-map-explorer`来分析`bundle`组成，再分析**大**的module在组件中的使用情况
- **其次**, 分析组件和module的对应关系

| Component | Module |   Code Split    |
| :-------: | :----: | :-------------: |
|     1     |   1    | Component Split |
|     1     |   n    | Component Split |
|     n     |   1    |  Module Split   |
|     n     |   n    |  Module Split   |

- **最后**, 如果你像让多个module封装成一个chunk, 使用`/* webpackChunkName: "my_lib" */`这个webpack自带的magic comments功能

## Future
- 在后续项目开发中，对于**非常大的包**，要提前做好`lazy-load`分析和处理，在写代码的时候可以借助`import cost`这个`vscode extension`
- 如有需要，可以使用`prefetch`预先在**后台**加载`特定`的lib，可以让人感觉不到任何`lazy-load`带来的延迟
