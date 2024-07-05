import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TestType } from "../../model/test.model";
import toast from "react-hot-toast";
import { BASE_URL } from "../../contants";

function Tests() {
	const navigate = useNavigate();
	const [tests, setTests] = React.useState<TestType[]>([]);

	useEffect(() => {
		const fetchTests = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					toast.error("Login to start tests");
					navigate("/login");
					return;
				}

				const res = await axios.get(`${BASE_URL}/api/v1/tests`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.status === 200) {
					setTests(res.data.data);
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
		<div className="flex flex-col items-center justify-center mt-6 min-h-[60vh]">
			<div className="w-4/5 max-w-3xl px-10 py-8 bg-white shadow-md rounded-lg">
				<h1 className="text-3xl text-nowrap font-bold text-center mb-8">
					Test your knowledge with our quizzes!
				</h1>
				<div className="space-y-4">
					{tests.length === 0 ? (
						<p className="text-2xl font-bold text-center mt-6">
							No tests available
						</p>
					) : (
						tests.map((test) => (
							<div
								key={test._id}
								className="text-2xl font-bold w-full py-1 flex justify-between items-center">
								<p>
									{test.name}: {test.duration} minutes
								</p>
								<button
									className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md text-center block"
									onClick={() => navigate(`./${test._id}`)}>
									Start Quiz
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default Tests;
