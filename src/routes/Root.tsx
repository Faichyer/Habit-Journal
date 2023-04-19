import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

type Props = {}

const Root = (props: Props) => {
	return (
		<div className="text-center text-base font-quicksand">
			<div className="min-h-screen flex flex-row">
				<Sidebar />
				<Outlet />
			</div>
		</div>
	)
}

export default Root
