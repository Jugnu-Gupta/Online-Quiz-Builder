import { Dispatch, SetStateAction } from "react";
import type { Option, Question } from "../model/Question.model";

const useQuestion = (setQuestions: Dispatch<SetStateAction<Question[]>>) => {
	const questionTextChangeHandler = (text: string, id: number) => {
		setQuestions((prevQuestion) =>
			prevQuestion.map((question: Question) => {
				if (question.id === id) {
					return {
						...question,
						text: text,
					};
				}
				return question;
			})
		);
	};

	const questionTypeChangeHandler = (text: string, id: number) => {
		setQuestions((prevQuestion) =>
			prevQuestion.map((question: Question) => {
				if (question.id === id) {
					return {
						...question,
						isMultipleCorrect: text === "Mutiple Correct",
					};
				}
				return question;
			})
		);
	};

	const addOptionHandler = (id: number) => {
		setQuestions((prevQuestion) =>
			prevQuestion.map((question: Question) => {
				if (question.id === id) {
					return {
						...question,
						options: [
							...question.options,
							{
								id: question.options.length,
								text: `Option ${question.options.length}`,
								isCorrect: false,
							},
						],
					};
				}
				return question;
			})
		);
	};

	const deleteOptionHandler = (Qid: number, optionId: number) => {
		setQuestions((prevQuestion) =>
			prevQuestion.map((question: Question) => {
				if (question.id === Qid) {
					return {
						...question,
						options: question.options
							.filter((option: Option) => option.id !== optionId)
							.map((option: Option, index: number) => {
								return {
									...option,
									id: index,
								};
							}),
					};
				}
				return question;
			})
		);
	};

	const toggleOption = (
		options: Option[],
		optionId: number,
		isMultipleCorrect: boolean
	) => {
		if (isMultipleCorrect) {
			return options.map((option: Option) => {
				if (option.id === optionId) {
					return {
						...option,
						isCorrect: !option.isCorrect,
					};
				}
				return option;
			});
		} else {
			return options.map((option: Option) => {
				if (option.id === optionId) {
					return {
						...option,
						isCorrect: !option.isCorrect,
					};
				}
				return {
					...option,
					isCorrect: false,
				};
			});
		}
	};

	const optionClickHandler = (Qid: number, optionId: number) => {
		setQuestions((prevQuestion) =>
			prevQuestion.map((question: Question) => {
				if (question.id === Qid && question.isAnswerKeyMode) {
					return {
						...question,
						options: toggleOption(
							question.options,
							optionId,
							question.isMultipleCorrect
						),
					};
				}
				return question;
			})
		);
	};

	const answerKeyModeHandler = (Qid: number) => {
		setQuestions((prevQuestion) =>
			prevQuestion.map((question: Question) => {
				if (question.id === Qid) {
					return {
						...question,
						isAnswerKeyMode: !question.isAnswerKeyMode,
					};
				}
				return question;
			})
		);
	};

	const deleteQuestionHandler = (Qid: number) => {
		setQuestions((prevQuestion) =>
			prevQuestion
				.filter((question: Question) => {
					return question.id !== Qid;
				})
				.map((question: Question, index: number) => {
					return {
						...question,
						id: index,
					};
				})
		);
	};

	return {
		questionTextChangeHandler,
		questionTypeChangeHandler,
		addOptionHandler,
		deleteOptionHandler,
		optionClickHandler,
		answerKeyModeHandler,
		deleteQuestionHandler,
	};
};

export default useQuestion;
