import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Feedback = {
	testName: string;
	score: number;
	correctAnswers: number;
	incorrectAnswers: number;
	totalQuestions: number;
	duration: string;
};

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "bottom" as const,
		},
		tooltip: {
			callbacks: {
				label: function (context: any) {
					let label = context.label || "";
					if (label) {
						label += ": ";
					}
					if (context.parsed !== null) {
						label += context.parsed;
					}
					return label;
				},
			},
		},
	},
};

const FeedbackCard: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
	const unattemptedQuestions: number =
		feedback.totalQuestions -
		feedback.correctAnswers -
		feedback.incorrectAnswers;

	const data = {
		labels: [
			"Correct Answers",
			"Incorrect Answers",
			"Unattempted Questions",
		],
		datasets: [
			{
				label: "Quiz Feedback",
				data: [
					feedback.correctAnswers,
					feedback.incorrectAnswers,
					unattemptedQuestions,
				],
				backgroundColor: ["#36a2eb", "#ff6384", "#ffcd56"],
			},
		],
	};

	const giveScore = (score: number) => {
		return Math.round((score / feedback.totalQuestions) * 100);
	};

	return (
		<div className="w-11/12 bg-white p-6 rounded-lg shadow-md my-4">
			<div className="text-center mb-6">
				<h1 className="text-2xl font-bold">{feedback.testName}</h1>
			</div>
			<div className="flex justify-between items-center">
				<div className="mb-6">
					<div>
						<strong>Score:</strong> {giveScore(feedback.score)}%
					</div>
					<div>
						<strong>Correct Answers:</strong>{" "}
						{feedback.correctAnswers}
					</div>
					<div>
						<strong>Incorrect Answers:</strong>{" "}
						{feedback.incorrectAnswers}
					</div>
					<div>
						<strong>Unattempted Questions:</strong>{" "}
						{unattemptedQuestions}
					</div>
					<div>
						<strong>Total Questions:</strong>{" "}
						{feedback.totalQuestions}
					</div>
					<div>
						<strong>Duration:</strong> {feedback.duration}
					</div>
				</div>
				<div className="relative md:w-72 sm:w-60 xs:w-48">
					<Doughnut data={data} options={options} />
				</div>
			</div>
		</div>
	);
};

export default FeedbackCard;
