import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import type { Question as QuestionType } from "../../model/Question.model";
import toast from "react-hot-toast";

const QuizBuilder: React.FC = () => {
	const [questions, setQuestions] = useState<QuestionType[]>([]);
	const [testDescription, setTestDescription] = useState("");
	const [duration, setDuration] = useState<number | string>("");

	const addQuestionHandler = () => {
		const newQuestion: QuestionType = {
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
		questions.forEach((question) => {
			if (question.text === "") {
				toast.error("Please fill all the questions description");
				return;
			} else if (question.options.length < 2) {
				toast.error("Please add atleast 2 options for each question");
				return;
			}
			if (!question.options.some((option) => option.isCorrect === true)) {
				toast.error(
					`Please provide answer key for each question i.e. ${
						question.id + 1
					}`
				);
				return;
			}
		});
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
