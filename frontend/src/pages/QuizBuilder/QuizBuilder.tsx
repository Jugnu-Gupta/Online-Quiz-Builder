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
					text: "Option 1",
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
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Create a Quiz</h1>
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Test Description
				</label>
				<input
					type="text"
					value={testDescription}
					onChange={(e) => setTestDescription(e.target.value)}
					placeholder="Untitled Test"
					className="mt-1 p-2 block w-full border rounded-md"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Duration (in minutes)
				</label>
				<input
					type="number"
					min={1}
					className="mt-1 p-2 block w-full border rounded-md"
					value={duration}
					onChange={(e) => setDuration(e.target.value)}
				/>
			</div>

			{questions.map((question) => {
				return (
					<QuestionForm
						key={question.id}
						question={question}
						setQuestions={setQuestions}
					/>
				);
			})}

			<button
				className="bg-green-500 text-white p-2 rounded-md mb-4"
				onClick={addQuestionHandler}>
				Add Question
			</button>
			<button
				className="bg-green-500 text-white p-2 rounded-md mb-4"
				onClick={saveTest}>
				Save Test
			</button>
		</div>
	);
};

export default QuizBuilder;
