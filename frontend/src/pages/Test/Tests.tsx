import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TestType } from "../../model/test.model";
import toast from "react-hot-toast";

function Tests() {
	const navigate = useNavigate();
	const [tests, setTests] = React.useState<TestType[]>([]);

	useEffect(() => {
		const fetchTests = async () => {
			try {
				const res = await axios.get("/tests");
				if (res.data.status === 200) {
					setTests(res.data.tests);
				} else {
					toast.error("Failed to fetch tests");
				}
			} catch (error) {
				toast.error("Failed to fetch tests");
			}
		};
		fetchTests();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-background">
			<div className="max-w-lg w-full px-10 py-8 bg-white shadow-md rounded-lg">
				<h1 className="text-2xl text-nowrap font-bold text-center mb-4">
					Test your knowledge with our quizzes!
				</h1>
				<div className="space-y-4">
					{tests.map((test) => (
						<div
							key={test._id}
							className="text-2xl font-bold w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md text-center block">
							<p>{test.name}</p>
							<button
								onClick={() => navigate(`./tests/${test._id}`)}>
								Start Quiz
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Tests;
