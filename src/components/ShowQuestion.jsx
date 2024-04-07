import { useEffect, useState } from 'react';
import YouWin from './YouWin';

export default function ShowQuestion({ questions, nrOfQuestions }) {
	const [correctAnswersInRow, setCorrectAnswersInRow] = useState(0);
	const [answersArray, setAnswersArray] = useState([]);
	const [question, setQuestion] = useState('');
	const [correctAnswer, setCorrectAnswer] = useState('');
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	const [incorrectAnswers, setIncorrectAnswers] = useState(0);

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
			setQuestion(question);
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
					<p>right answers {correctAnswersInRow}</p>
					<p>false answers {incorrectAnswers}</p>
					<h2>{question}</h2>
					{answersArray.map((answer) => (
						<button
							disabled={correctAnswersInRow === nrOfQuestions}
							onClick={checkAnswer}
							key={answer}
						>
							{answer}
						</button>
					))}
					{console.log(correctAnswersInRow)}
				</div>
			)}
		</>
	);
}
