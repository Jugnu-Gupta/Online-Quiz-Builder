import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-background">
			<div className="max-w-lg w-full px-10 py-8 bg-white shadow-md rounded-lg">
				<h1 className="text-4xl font-bold text-center mb-4">
					Welcome to Quiz App
				</h1>
				<p className="text-xl text-gray-700 mb-6 pt-4">
					Test your knowledge with our quizzes!
				</p>
				<div className="space-y-4">
					<Link
						to="/tests"
						className="text-2xl font-bold w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md text-center block">
						Start Quiz
					</Link>
					<Link
						to="/quizbuilder"
						className="text-2xl font-bold w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md text-center block">
						Build Quiz
					</Link>
					<Link
						to="/feedbacks"
						className="text-2xl font-bold w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md text-center block">
						View Feedbacks
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
