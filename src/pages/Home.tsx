import Sidebar from '../components/Sidebar'

type HomeProps = {}

const Home = (props: HomeProps) => {
	return (
		<div className="min-h-screen flex flex-row">
			<Sidebar />
			<div>Next demain</div>
		</div>
	)
}

export default Home
