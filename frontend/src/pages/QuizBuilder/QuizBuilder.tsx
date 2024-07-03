import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import type { Question } from "../../model/Question.model";

const QuizBuilder: React.FC = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [testDescription, setTestDescription] = useState("");
	const [duration, setDuration] = useState<number | string>("");

	const addQuestionHandler = () => {
		const newQuestion: Question = {
			id: questions.length,
			text: "",
			options: [
				{
					id: 0,
					text: "",
					isCorrect: false,
				},
			],
			isMultipleCorrect: true,
			isAnswerKeyMode: false,
		};
		setQuestions([...questions, newQuestion]);
	};

	const saveTest = () => {
		// Handle test saving logic here
		console.log("Test saved", { testDescription, duration, questions });
	};

	return (
		<div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
			<h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
				Create a Quiz
			</h1>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Test Description
				</label>
				<input
					type="text"
					value={testDescription}
					onChange={(e) => setTestDescription(e.target.value)}
					placeholder="Untitled Test"
					className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring focus:ring-green-300"
				/>
			</div>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Duration (in minutes)
				</label>
				<input
					type="number"
					min={1}
					className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring focus:ring-green-300"
					value={duration}
					onChange={(e) => setDuration(e.target.value)}
				/>
			</div>

			{questions.map((question) => (
				<QuestionForm
					key={question.id}
					question={question}
					setQuestions={setQuestions}
				/>
			))}

			<div className="flex justify-between mt-6">
				<button
					className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
					onClick={addQuestionHandler}>
					Add Question
				</button>
				{questions?.length > 0 && (
					<button
						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
						onClick={saveTest}>
						Save Test
					</button>
				)}
			</div>
		</div>
	);
};

export default QuizBuilder;
