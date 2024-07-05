import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { BASE_URL } from "../../contants";

interface Option {
	option: string;
	isCorrect: boolean;
}

interface QuestionType {
	QNo: number;
	description: string;
	options: Option[];
	isMultipleCorrect: boolean;
	testId: string;
}

const QuizPage: React.FC = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [timeLeft, setTimeLeft] = useState<number>(60); // in seconds
	const [selectedAnswers, setSelectedAnswers] = useState<Array<string[]>>([
		[],
	]);
	const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(
		null
	);
	const [questions, setQuestions] = useState<QuestionType[]>([]);
	const [duration, setDuration] = useState<number>(0);
	const [testName, setTestName] = useState<string>("");
	const { testId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTests = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					`${BASE_URL}/api/v1/tests/${testId}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (res.status === 200) {
					const data = res.data.data;
					// console.log("Response:", data);

					setSelectedAnswers(
						new Array(data.questions.length).fill([])
					);
					setQuestions(data.questions);
					setDuration(data.duration);
					setTestName(data.name);
					setTimeLeft(data.duration * 60);
					setCurrentQuestion(data?.questions?.[currentQuestionIndex]);
				} else {
					toast.error("Failed to fetch tests");
				}
			} catch (error) {
				toast.error("Failed to fetch tests");
			}
		};
		fetchTests();
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime <= 1) {
					saveAnswers();
					navigate("/");
				}
				return prevTime > 0 ? prevTime - 1 : 0;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const toggleOption = (answers: string[], option: string) => {
		if (answers.includes(option)) {
			return answers.filter((answer) => answer !== option);
		} else {
			return [...answers, option];
		}
	};

	const handleOptionClick = (option: string) => {
		const updatedAnswers = selectedAnswers || [];
		if (questions[currentQuestionIndex].isMultipleCorrect) {
			updatedAnswers[currentQuestionIndex] = toggleOption(
				updatedAnswers[currentQuestionIndex],
				option
			);
		} else {
			updatedAnswers[currentQuestionIndex] = [option];
		}
		setSelectedAnswers(updatedAnswers);
	};

	const handleNext = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestion(questions[currentQuestionIndex + 1]);
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const handlePrev = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestion(questions[currentQuestionIndex - 1]);
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const saveAnswers = async () => {
		interface Answer {
			question: QuestionType;
			selectedOption: string[];
		}

		const answers: Answer[] = [];
		for (let i = 0; i < questions.length; i++) {
			const question = questions[i];
			const selectedOption = selectedAnswers[i];
			answers.push({
				question: question,
				selectedOption,
			});
		}

		const feedback = {
			testId,
			duration,
			answers,
		};

		// Save answers to the server
		const token = localStorage.getItem("token");
		const res = await axios.post(`${BASE_URL}/api/v1/feedbacks`, feedback, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.status === 200) {
			toast.success("Answers saved successfully");
		} else {
			toast.error("Failed to save answers");
		}
		navigate("/");
	};

	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
	};

	return (
		<div className="w-4/5 max-w-3xl mx-auto p-4 text-center font-sans">
			<div className="bg-white rounded-lg">
				<div className="flex justify-between items-center flex-col mt-4 py-4">
					<div className="text-2xl font-bold pb-3">
						Quiz Mode {testName && `: ${testName}`}
					</div>
					<div className="flex items-center justify-end w-full">
						<div className="flex items-center font-bold mr-8 text-lg">
							Timer: {formatTime(timeLeft)} min
						</div>
					</div>
				</div>
				<div className="mb-4">
					<h2 className="font-bold text-xl text-start mx-8">
						Q{currentQuestionIndex + 1}
						{". "}
						{currentQuestion?.description}
						{currentQuestion?.isMultipleCorrect
							? " Multiple answers"
							: ""}
					</h2>
					<div className="flex flex-col my-6">
						{currentQuestion?.options.map((option, index) => (
							<div
								key={index}
								className="text-start ml-8 font-bold">
								<span className="text-lg">{index + 1}. </span>
								<button
									className={`bg-blue-500 text-white border-none py-3 px-6 rounded-md m-2 cursor-pointer w-48 hover:bg-blue-700 ${
										selectedAnswers[
											currentQuestionIndex
										].includes(option.option)
											? "bg-blue-700"
											: ""
									}`}
									onClick={() =>
										handleOptionClick(option.option)
									}>
									{option.option}
								</button>
							</div>
						))}
					</div>
					<div className="text-end mr-8 text-lg">
						{currentQuestionIndex + 1} of {questions.length}
					</div>
				</div>
				<div className="mt-4">
					<button
						onClick={handlePrev}
						disabled={currentQuestionIndex === 0}
						className={twMerge(
							"bg-green-600 text-white border-none py-2 px-4 rounded-md m-2 cursor-pointer hover:bg-green-700 ",
							currentQuestionIndex === 0
								? "opacity-75"
								: "opacity-100"
						)}>
						Previous
					</button>
					<button
						onClick={handleNext}
						disabled={currentQuestionIndex === questions.length - 1}
						className={twMerge(
							"bg-green-600 text-white border-none py-2 px-4 rounded-md m-2 cursor-pointer hover:bg-green-700 ",
							currentQuestionIndex === questions.length - 1
								? "opacity-75"
								: "opacity-100"
						)}>
						Next
					</button>
					<button
						onClick={saveAnswers}
						className="bg-gray-600 text-white border-none py-2 px-4 rounded-md m-2 cursor-pointer hover:bg-gray-700">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default QuizPage;
