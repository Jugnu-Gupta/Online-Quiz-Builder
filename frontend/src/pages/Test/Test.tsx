import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { TestType } from "../../model/test.model";
import axio from "axios";
import toast from "react-hot-toast";

// interface RouteParams {
// 	testId: string;
// }

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

interface QuestionAndAnsType {
	questionId: string;
	selectedOption: string[];
}

interface TestType {
	name: string;
	ownerId: string;
	questions: QuestionType[] | QuestionAndAnsType[];
	duration: number;
}

// const questionSchema = new mongoose.Schema(
//     {
//         QNo: {
//             type: Number,
//             required: true,
//         },
//         description: {
//             type: String,
//             required: true,
//         },
//         isMultipleCorrect: {
//             type: Boolean,
//             required: true,
//         },
//         options: [
//             {
//                 option: {
//                     type: String,
//                     required: true,
//                     unique: true,
//                 },
//                 isCorrect: {
//                     type: Boolean,
//                     required: true,
//                 },
//             },
//         ],
//         testId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Test",
//         },
//     },
//     { timestamps: true }
// );
// const testSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         ownerId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//         },
//         questions: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Question",
//             },
//         ],
//         duration: {
//             type: Number,
//             required: true,
//         },
//     },
//     { timestamps: true }
// );

const questions: QuestionType[] = [
	{
		_id: "1",
		description: "Google was founded in what year?",
		options: [
			{ option: "1997", isCorrect: false },
			{ option: "1998", isCorrect: false },
			{ option: "1999", isCorrect: false },
			{ option: "2000", isCorrect: true },
		],
		isMultipleCorrect: false,
	},
	{
		_id: "2",
		description: "Select the prime numbers:",
		options: [
			{ option: "2", isCorrect: true },
			{ option: "3", isCorrect: true },
			{ option: "4", isCorrect: false },
			{ option: "5", isCorrect: true },
		],
		isMultipleCorrect: true,
	},
	// Add more questions here
];

const QuizPage: React.FC = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
	const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
	const [selectedAnswers, setSelectedAnswers] = useState<Array<string[]>>([
		[],
	]);
	const [test, setTest] = useState<TestType>();

	// const [feedback, setFeedback] = useState<TestType | null>(null);
	const { testId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		axio.get(`http://localhost:4000/api/v1/tests/${testId}`)
			.then((res) => {
				if (res.status === 200) {
					setTest(res.data);
					setTimeLeft(res.data.duration);
				} else {
					toast.error("Failed to fetch test data");
				}
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				toast.error("Failed to fetch test data");
			});

		console.log(test);
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
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const handlePrev = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const saveAnswers = async () => {
		// set data in feedback;
		// and post it.

		console.log("Saving answers:", selectedAnswers);

		// Add logic to save answers (e.g., send them to a server or save them to local storage)
	};

	const handleQuit = () => {
		saveAnswers();

		navigate("/feedbacks"); // Redirect to feeback page.
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
				<h2>{currentQuestion.description}</h2>
				<div className="flex flex-wrap justify-between">
					{currentQuestion.options.map((option, index) => (
						<button
							key={index}
							className={`bg-blue-500 text-white border-none py-3 px-6 rounded-md m-2 cursor-pointer w-48 hover:bg-blue-700 ${
								selectedAnswers[currentQuestionIndex].includes(
									option.option
								)
									? "bg-blue-700"
									: ""
							}`}
							onClick={() => handleOptionClick(option.option)}>
							{option.option}
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
