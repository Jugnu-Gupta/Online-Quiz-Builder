import React from "react";
import { RxCross2 } from "react-icons/rx";
import type { Option, Question } from "../../model/Question.model";
import useQuestion from "../../hooks/useQuestion";

interface QuestionFormProps {
	question: Question;
	setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuestionForm = ({ question, setQuestions }: QuestionFormProps) => {
	const {
		questionTextChangeHandler,
		questionTypeChangeHandler,
		addOptionHandler,
		deleteOptionHandler,
		optionClickHandler,
		optionTextChangeHandler,
		answerKeyModeHandler,
		deleteQuestionHandler,
	} = useQuestion(setQuestions);

	return (
		<div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
			<div className="mb-4 flex items-center gap-4">
				<input
					className="flex-1 mt-1 p-3 block border rounded-md shadow-sm focus:ring focus:ring-green-300"
					value={question.text}
					placeholder="Question"
					required
					onChange={(e) =>
						questionTextChangeHandler(question.id, e.target.value)
					}
				/>
				<select
					className="mt-1 p-3 border rounded-md shadow-sm focus:ring focus:ring-green-300"
					name="question Type"
					onChange={(e) =>
						questionTypeChangeHandler(
							question.id,
							e.target.value as
								| "Single Correct"
								| "Multiple Correct"
						)
					}
					value={
						question.isMultipleCorrect
							? "Multiple Correct"
							: "Single Correct"
					}>
					<option value="Multiple Correct">Multiple Correct</option>
					<option value="Single Correct">Single Correct</option>
				</select>
			</div>
			<div className="flex flex-col gap-2 mb-4">
				{question.options.map((option: Option) => (
					<div
						key={option.id}
						className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
						{!question.isAnswerKeyMode ? (
							<>
								<input
									className="flex-1 p-2 border rounded-md"
									type="text"
									value={option.text}
									required
									placeholder={`Option ${option.id}`}
									onChange={(e) =>
										optionTextChangeHandler(
											question.id,
											option.id,
											e.target.value
										)
									}
								/>
								<button
									className="ml-2 text-red-500 hover:text-red-700 transition duration-300"
									onClick={() =>
										deleteOptionHandler(
											question.id,
											option.id
										)
									}>
									<RxCross2 />
								</button>
							</>
						) : (
							<p
								className={`flex-1 p-2 cursor-pointer ${
									option.isCorrect ? "bg-green-100" : ""
								}`}
								onClick={() =>
									optionClickHandler(question.id, option.id)
								}>
								{option.text}
							</p>
						)}
					</div>
				))}
				{!question.isAnswerKeyMode && (
					<button
						className="mt-2 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
						onClick={() => addOptionHandler(question.id)}>
						Add Option
					</button>
				)}
			</div>
			<div className="flex justify-between items-center">
				{question.isAnswerKeyMode ? (
					<>
						<button
							className="p-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
							onClick={() =>
								answerKeyModeHandler(question.id, false)
							}>
							Done
						</button>
						<button
							className="p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300"
							onClick={() => deleteQuestionHandler(question.id)}>
							Delete Question
						</button>
					</>
				) : (
					<button
						className="p-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300"
						onClick={() => answerKeyModeHandler(question.id, true)}>
						Answer Key
					</button>
				)}
			</div>
		</div>
	);
};

export default QuestionForm;
