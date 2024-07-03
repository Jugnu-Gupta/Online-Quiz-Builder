import React from "react";
import FeedbackCard from "./FeedbackCard";

type Feedback = {
	testName: string;
	score: number;
	correctAnswers: number;
	incorrectAnswers: number;
	unattemptedQuestions: number;
	totalQuestions: number;
	duration: string;
};

const feedbacks: Feedback[] = [
	{
		testName: "Sample Quiz 1",
		score: 80,
		correctAnswers: 8,
		incorrectAnswers: 2,
		unattemptedQuestions: 0,
		totalQuestions: 10,
		duration: "15 minutes",
	},
	{
		testName: "Sample Quiz 2",
		score: 70,
		correctAnswers: 7,
		incorrectAnswers: 3,
		unattemptedQuestions: 0,
		totalQuestions: 10,
		duration: "20 minutes",
	},
	// Add more feedback objects as needed
];

const Feedbacks: React.FC = () => {
	return (
		<div className="flex flex-col items-center bg-gray-100 min-h-screen">
			{feedbacks.map((feedback, index) => (
				<FeedbackCard key={index} feedback={feedback} />
			))}
		</div>
	);
};

export default Feedbacks;
