import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

type Feedback = {
	testName: string;
	score: number;
	correctAnswers: number;
	incorrectAnswers: number;
	unattemptedQuestions: number;
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
					feedback.unattemptedQuestions,
				],
				backgroundColor: ["#36a2eb", "#ff6384", "#ffcd56"],
			},
		],
	};

	return (
		<div className="w-4/5 max-w-3xl bg-white p-6 mt-10 rounded-lg shadow-md">
			<div className="text-center mb-6">
				<h1 className="text-2xl font-bold">
					{feedback.testName} Feedback
				</h1>
			</div>
			<div className="flex justify-between items-center">
				<div className="mb-6">
					<div>
						<strong>Test Name:</strong> {feedback.testName}
					</div>
					<div>
						<strong>Score:</strong> {feedback.score}%
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
						{feedback.unattemptedQuestions}
					</div>
					<div>
						<strong>Total Questions:</strong>{" "}
						{feedback.totalQuestions}
					</div>
					<div>
						<strong>Duration:</strong> {feedback.duration}
					</div>
				</div>
				<div className="relative h-96">
					<Doughnut data={data} options={options} />
				</div>
			</div>
		</div>
	);
};

export default FeedbackCard;
