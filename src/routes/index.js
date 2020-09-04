import loadable from '@/utils/loadable'

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))


const Test1 = loadable(() => import('@/views/Test/Test1'))
const Test21 = loadable(() => import('@/views/Test/Test21'))
const Test22 = loadable(() => import('@/views/Test/Test22'))
const Demo1 = loadable(() => import('@/views/Test/Demo'))
const Detail = loadable(() => import('@/views/Test/Detail'))

const routes = [
    { path: '/index', exact: true, name: 'Index', component: Index },
    { path: '/test/test1', exact: true, name: 'Test1', component: Test1 },
    { path: '/test/test2/test21', exact: true, name: 'Test21', component: Test21 },
    { path: '/test/test2/test22', exact: true, name: 'Test22', component: Test22 },
    { path: '/demo/demo', exact: true, name: 'Demo', component: Demo1 },
    { path: '/demo/demo/detail', exact: true, name: 'Detail', component: Detail },
]

export default routes
