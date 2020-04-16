import Loadable from 'react-loadable';
import Loader from './Loader'

export const MyComponent = Loadable({
    loader: () => import('./MyComponent'),
    loading: Loader
})

export const ShitComponent = Loadable({
    loader: () => import('./ShitComponent'),
    loading: Loader
})