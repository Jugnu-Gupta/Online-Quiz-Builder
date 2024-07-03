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
		answerKeyModeHandler,
		deleteQuestionHandler,
	} = useQuestion(setQuestions);

	return (
		<div>
			<div className="mb-4 flex">
				<input
					className="mt-1 p-2 block w-full border rounded-md"
					value={question.text}
					placeholder="Question"
					onChange={(e) =>
						questionTextChangeHandler(e.target.value, question.id)
					}
				/>
				<select
					name="question Type"
					id=""
					onChange={(e) =>
						questionTypeChangeHandler(e.target.value, question.id)
					}
					value={
						question.isMultipleCorrect
							? "Mutiple Correct"
							: "Single Correct"
					}>
					<option value="Mutiple Correct">Mutiple Correct</option>
					<option value="Single Correct">Single Correct</option>
				</select>
			</div>
			<div className="flex-col gap-2">
				{question.options.map((option: Option) => {
					return (
						<div key={option.id} className="flex justify-between">
							{!question.isAnswerKeyMode ? (
								<>
									<input
										type="text"
										value={option.text}
										required
									/>
									<button
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
									className="w-full h-full"
									onClick={() =>
										optionClickHandler(
											question.id,
											option.id
										)
									}>
									{option.text}
								</p>
							)}
						</div>
					);
				})}
				{!question.isAnswerKeyMode ? (
					<button onClick={() => addOptionHandler(question.id)}>
						Add Option
					</button>
				) : null}
			</div>
			<div className="flex justify-between">
				{question.isAnswerKeyMode ? (
					<>
						<button
							onClick={() => answerKeyModeHandler(question.id)}>
							Answer Key
						</button>
						<button
							onClick={() => deleteQuestionHandler(question.id)}>
							Delete Question
						</button>
					</>
				) : (
					<button onClick={() => answerKeyModeHandler(question.id)}>
						Done
					</button>
				)}
			</div>
		</div>
	);
};

export default QuestionForm;
