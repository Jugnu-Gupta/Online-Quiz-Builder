import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";

interface Option {
	text: string;
}

interface Question {
	question: string;
	options: Option[];
	multipleCorrect: boolean;
}

const questions: Question[] = [
	{
		question: "Google was founded in what year?",
		options: [
			{ text: "1997" },
			{ text: "1998" },
			{ text: "1999" },
			{ text: "2000" },
		],
		multipleCorrect: false,
	},
	{
		question: "Select the prime numbers:",
		options: [{ text: "2" }, { text: "3" }, { text: "4" }, { text: "5" }],
		multipleCorrect: true,
	},
	// Add more questions here
];

const QuizPage: React.FC = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
	const [selectedAnswers, setSelectedAnswers] = useState<Array<string[]>>(
		questions.map(() => [])
	);
	const navigate = useNavigate();

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
		const updatedAnswers = [...selectedAnswers];
		if (questions[currentQuestionIndex].multipleCorrect) {
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
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const handlePrev = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const saveAnswers = () => {
		console.log("Saving answers:", selectedAnswers);
		// Add logic to save answers (e.g., send them to a server or save them to local storage)
	};

	const handleQuit = () => {
		saveAnswers();
		navigate("/"); // Redirect to home or a quit confirmation page
	};

	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
	};

	const currentQuestion = questions[currentQuestionIndex];

	return (
		<div className="w-1/2 mx-auto p-4 text-center font-sans">
			<div className="flex justify-between items-center mb-4">
				<div className="text-2xl font-bold">Free Quiz Mode</div>
				<div className="flex items-center">
					<div className="mr-4">
						{currentQuestionIndex + 1} of {questions.length}
					</div>
					<div className="flex items-center">
						<FaLightbulb className="mr-2" /> {formatTime(timeLeft)}
					</div>
				</div>
			</div>
			<div className="mb-4">
				<h2>{currentQuestion.question}</h2>
				<div className="flex flex-wrap justify-between">
					{currentQuestion.options.map((option, index) => (
						<button
							key={index}
							className={`bg-blue-500 text-white border-none py-3 px-6 rounded-md m-2 cursor-pointer w-48 hover:bg-blue-700 ${
								selectedAnswers[currentQuestionIndex].includes(
									option.text
								)
									? "bg-blue-700"
									: ""
							}`}
							onClick={() => handleOptionClick(option.text)}>
							{option.text}
						</button>
					))}
				</div>
			</div>
			<div className="mt-4">
				<button
					onClick={handlePrev}
					disabled={currentQuestionIndex === 0}
					className="bg-green-600 text-white border-none py-2 px-4 rounded-md m-2 cursor-pointer hover:bg-green-700">
					Previous
				</button>
				<button
					onClick={handleNext}
					disabled={currentQuestionIndex === questions.length - 1}
					className="bg-green-600 text-white border-none py-2 px-4 rounded-md m-2 cursor-pointer hover:bg-green-700">
					Next
				</button>
				<button
					onClick={handleQuit}
					className="bg-gray-600 text-white border-none py-2 px-4 rounded-md m-2 cursor-pointer hover:bg-gray-700">
					Quit
				</button>
			</div>
		</div>
	);
};

export default QuizPage;
