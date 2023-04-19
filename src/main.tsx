import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './routes/Root'
import Habits from './routes/Habits'
import Account from './routes/Account'
import Analytics from './routes/Analytics'
import Settings from './routes/Settings'
import Home from './pages/Home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/habits',
				element: <Habits />,
			},
			{
				path: '/account',
				element: <Account />,
			},
			{
				path: '/analytics',
				element: <Analytics />,
			},
			{
				path: '/settings',
				element: <Settings />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
