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
	_id: string;
	name: string;
	ownerId: string;
	questions: QuestionType[] | QuestionAndAnsType[];
	duration: number;
}

export type { Option, QuestionType, QuestionAndAnsType, TestType };
