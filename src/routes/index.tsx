import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Users from '../pages/Users'
import Posts from '../pages/Posts'
import Comments from '../pages/Comments'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
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
    ],
  },
])
