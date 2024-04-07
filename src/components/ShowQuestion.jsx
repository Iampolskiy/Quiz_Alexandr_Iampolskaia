import { useEffect, useState } from 'react';
import YouWin from './YouWin';

export default function ShowQuestion({ questions, nrOfQuestions }) {
	const [correctAnswersInRow, setCorrectAnswersInRow] = useState(0);
	const [answersArray, setAnswersArray] = useState([]);
	const [question, setQuestion] = useState('');
	const [correctAnswer, setCorrectAnswer] = useState('');
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	const [incorrectAnswers, setIncorrectAnswers] = useState(0);

	function decodeHtmlEntities(text) {
		const textArea = document.createElement('textarea');
		textArea.innerHTML = text;
		return textArea.value;
	}
	useEffect(() => {
		if (questions.length > 0 && correctAnswersInRow < nrOfQuestions) {
			const incorrectAnswers = questions[correctAnswersInRow].incorrect_answers;
			const question = questions[correctAnswersInRow].question;
			const correctAnswer =
				questions[correctAnswersInRow].correct_answer + '!!!!';
			const newAnswersArray = [...incorrectAnswers, correctAnswer].sort(
				() => Math.random() - 0.5
			);
			setCorrectAnswer(correctAnswer);
			setAnswersArray(newAnswersArray);
			setQuestion(decodeHtmlEntities(question));
			console.log(newAnswersArray);
		} else {
			console.log('All questions answered');
		}
	}, [questions, correctAnswersInRow]);

	function checkAnswer(e) {
		const buttonText = e.target.textContent;
		if (correctAnswer === buttonText) {
			setCorrectAnswersInRow(correctAnswersInRow + 1);
			console.log('Right Answer!');
			console.log(correctAnswersInRow);
		} else {
			console.log('Wrong Answer!');
			setIncorrectAnswers(incorrectAnswers + 1);
		}
		console.log(buttonText);
		const rightAnswers = correctAnswersInRow + 1;
		if (rightAnswers === nrOfQuestions) {
			console.log('PARTY');
			() => setButtonsDisabled(true);
			console.log(buttonsDisabled);
		}
	}

	return (
		<>
			{correctAnswersInRow === nrOfQuestions ? (
				<YouWin
					correctAnswersInRow={correctAnswersInRow}
					incorrectAnswers={incorrectAnswers}
				/>
			) : (
				<div>
					<div>right answers {correctAnswersInRow}</div>
					<div>false answers {incorrectAnswers}</div>
					<div className="question">{question}</div>
					<div className="answer_wrapper">
						{answersArray.map((answer) => (
							<button
								className="answers"
								disabled={correctAnswersInRow === nrOfQuestions}
								onClick={checkAnswer}
								key={answer}
							>
								<div>{answer}</div>
							</button>
						))}
					</div>
					{console.log(correctAnswersInRow)}
				</div>
			)}
		</>
	);
}
