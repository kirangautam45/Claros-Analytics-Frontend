import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import { LazyPage } from '../components/common/LazyPage'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Users = lazy(() => import('../pages/Users'))
const Posts = lazy(() => import('../pages/Posts'))
const Comments = lazy(() => import('../pages/Comments'))
const Todos = lazy(() => import('../pages/Todos'))
const NotFound = lazy(() => import('../pages/NotFound'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LazyPage Component={Dashboard} />,
      },
      {
        path: 'users',
        element: <LazyPage Component={Users} />,
      },
      {
        path: 'posts',
        element: <LazyPage Component={Posts} />,
      },
      {
        path: 'comments',
        element: <LazyPage Component={Comments} />,
      },
      {
        path: 'todos',
        element: <LazyPage Component={Todos} />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
