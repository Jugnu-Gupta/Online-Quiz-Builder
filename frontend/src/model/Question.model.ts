interface Option {
	id: number;
	text: string;
	isCorrect: boolean;
}

interface Question {
	id: number;
	text: string;
	options: Option[];
	isMultipleCorrect: boolean;
	isAnswerKeyMode: boolean;
}

export type { Option, Question };
