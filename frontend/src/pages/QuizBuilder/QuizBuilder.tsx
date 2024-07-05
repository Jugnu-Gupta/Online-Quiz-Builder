import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import type { Question as QuestionType } from "../../model/Question.model";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../contants";

const QuizBuilder: React.FC = () => {
	const [questions, setQuestions] = useState<QuestionType[]>([]);
	const [testDescription, setTestDescription] = useState("");
	const [duration, setDuration] = useState<number | string>("");
	const navigate = useNavigate();

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

	const validateQuestions = () => {
		let isValid: boolean = true;
		if (testDescription === "") {
			toast.error("Please provide test description");
			return false;
		} else if (duration === "") {
			toast.error("Please provide test duration");
			return false;
		}
		isValid = questions.every((question) => {
			if (question.text === "") {
				toast.error("Please fill all the questions description");
				return false;
			} else if (question.options.length < 2) {
				toast.error("Please add atleast 2 options for each question");
				return false;
			}
			if (!question.options.some((option) => option.isCorrect === true)) {
				toast.error(
					`Please provide answer key for each question i.e. Q${
						question.id + 1
					}`
				);
				return false;
			}
			return true;
		});
		return isValid;
	};

	const saveTest = async () => {
		if (!validateQuestions()) return;

		const sendQuestions = questions.map((question) => {
			return {
				QNo: question.id + 1,
				text: question.text,
				isMultipleCorrect: question.isMultipleCorrect,
				options: question.options.map((option) => {
					return {
						text: option.text,
						isCorrect: option.isCorrect,
					};
				}),
			};
		});

		const test = {
			description: testDescription,
			duration,
			questions: sendQuestions,
		};

		const token = localStorage.getItem("token");
		const res = await axios.post(`${BASE_URL}/api/v1/tests`, test, {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.status === 200) {
			toast.success("Answers saved successfully");
			navigate("/tests");
		} else {
			toast.error("Failed to save answers");
			navigate("/");
		}
		// console.log("Test saved", test);
	};

	return (
		<div className="p-6 max-w-4xl mx-auto rounded-lg">
			<div className="m-4 bg-white p-4 rounded-lg">
				<h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
					Build a Quiz
				</h1>
				<div className="flex justify-between">
					<div className="mb-6 w-2/3">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Test Description
						</label>
						<input
							type="text"
							value={testDescription}
							onChange={(e) => setTestDescription(e.target.value)}
							placeholder="Untitled Test"
							className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring focus:ring-green-300 outline-none transition duration-300"
						/>
					</div>
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Duration (in minutes)
						</label>
						<input
							type="number"
							min={1}
							className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring focus:ring-green-300 outline-none transition duration-300"
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
						/>
					</div>
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
							type="button"
							className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
							onClick={saveTest}>
							Save Test
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuizBuilder;
