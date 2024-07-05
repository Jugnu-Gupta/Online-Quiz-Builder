import React, { useEffect, useState } from "react";
import FeedbackCard from "./FeedbackCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../contants";

type Feedback = {
	testName: string;
	score: number;
	correctAnswers: number;
	incorrectAnswers: number;
	totalQuestions: number;
	duration: string;
};

const Feedbacks: React.FC = () => {
	const navigate = useNavigate();
	const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					toast.error("Login to view feedbacks");
					navigate("/login");
					return;
				}

				const res = await axios.get(`${BASE_URL}/api/v1/feedbacks`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				if (res.status === 200) {
					setFeedbacks(res.data.data);
				} else {
					toast.error("Failed to fetch feedbacks");
				}
			} catch (error) {
				toast.error("Failed to fetch feedbacks");
			}
		};
		fetchFeedbacks();
	}, []);

	return (
		<div className="flex flex-col items-center bg-gray-200 max-w-3xl mx-auto w-3/4 xs:w-11/12 my-6 rounded-xl">
			<div className="text-center my-6 text-blue-500">
				<h1 className="text-3xl font-bold">Feedbacks</h1>
			</div>
			{feedbacks.map((feedback, index) => (
				<FeedbackCard key={index} feedback={feedback} />
			))}
			{feedbacks.length === 0 && (
				<div className="w-4/5 max-w-3xl bg-white p-6 mb-8 mt-4 rounded-lg shadow-md">
					<p className="text-2xl font-bold text-center">
						No feedbacks available
					</p>
				</div>
			)}
		</div>
	);
};

export default Feedbacks;
