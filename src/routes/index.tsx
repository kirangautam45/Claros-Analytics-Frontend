import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import Posts from '../pages/Posts'
import Comments from '../pages/Comments'
import Todos from '../pages/Todos'
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'comments',
        element: <Comments />,
      },
      {
        path: 'todos',
        element: <Todos />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
