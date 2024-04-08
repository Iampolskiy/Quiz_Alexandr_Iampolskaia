import { useEffect, useState } from 'react';
import YouWin from './YouWin';
import '@animxyz/core';
import { XyzTransition } from '@animxyz/react';
import { xyz } from '@animxyz/react';
import { toUpperCase } from '../helpers/helpers';

export default function ShowQuestion({
	questions,
	nrOfQuestions,
	endQuiz,
	quizType,
	difficulty,
	selectedCategorie,
}) {
	const [correctAnswersInRow, setCorrectAnswersInRow] = useState(0);
	const [answersArray, setAnswersArray] = useState([]);
	const [question, setQuestion] = useState('');
	const [correctAnswer, setCorrectAnswer] = useState('');
	const [buttonsDisabled, setButtonsDisabled] = useState(false);
	const [incorrectAnswers, setIncorrectAnswers] = useState(0);
	const [answerStatus, setAnswerStatus] = useState('');

	function decodeHtmlEntities(text) {
		const textArea = document.createElement('textarea');
		textArea.innerHTML = text;
		return textArea.value;
	}

	const endQuizHandler = () => {
		endQuiz();
	};
	useEffect(() => {
		if (questions.length > 0 && correctAnswersInRow < nrOfQuestions) {
			const incorrectAnswers = questions[correctAnswersInRow].incorrect_answers;
			const question = questions[correctAnswersInRow].question;
			const correctAnswer = decodeHtmlEntities(
				questions[correctAnswersInRow].correct_answer
			); /* + '!!!!' */
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
			setAnswerStatus('correctAnswer');
			e.currentTarget.classList.add('correctAnswer');
			setTimeout(() => {
				setCorrectAnswersInRow(correctAnswersInRow + 1);
			}, 2000);

			console.log('Right Answer!');
			console.log(correctAnswersInRow);
		} else {
			console.log('Wrong Answer!');
			e.currentTarget.classList.add('incorrectAnswer');
			setAnswerStatus('incorrectAnswer');
			setTimeout(() => {
				setIncorrectAnswers(incorrectAnswers + 1);
			}, 2000);
			e.currentTarget.style.backgroundColor = 'red';
			e.currentTarget.disabled = true;
		}
		console.log(buttonText);
		const rightAnswers = correctAnswersInRow + 1;
		if (rightAnswers === nrOfQuestions) {
			console.log('PARTY');
			() => setButtonsDisabled(true);
			console.log(buttonsDisabled);
		}
	}

	const fadeArrayAnswers = [
		'fade up left delay-1',
		'fade up up delay-2',
		'fade up up delay-3',
		'fade down right delay-4',
	];

	return (
		<>
			{correctAnswersInRow === nrOfQuestions ? (
				<YouWin
					correctAnswersInRow={correctAnswersInRow}
					incorrectAnswers={incorrectAnswers}
					selectedCategorie={selectedCategorie}
					difficulty={difficulty}
					quizType={quizType}
				/>
			) : (
				<div>
					<div className="info-container">
						<div>
							{selectedCategorie.name
								? 'Category:' + selectedCategorie.name
								: 'Category: Random'}
						</div>
						<div>
							{difficulty
								? 'Difficulty:' + ' ' + toUpperCase(difficulty)
								: ' Difficulty: Random'}
						</div>
						<div>
							{quizType
								? 'Quiz Type:' + ' ' + toUpperCase(quizType)
								: 'Type: Random'}
						</div>
					</div>
					<div className="info-container2">
						<div className="emojiHand"> 👍 {correctAnswersInRow}</div>
						<div className="emojiHand"> 👎 {incorrectAnswers}</div>
						<div>SCORE {correctAnswersInRow - incorrectAnswers}</div>
					</div>
					<div className="question xyz-in" xyz="fade up delay-2">
						{question}
					</div>
					<div className="answer_wrapper">
						{answersArray.map((answer, index) => (
							<button
								className=" answers xyz-in"
								xyz={fadeArrayAnswers[index]} //fade up left delay-1
								disabled={correctAnswersInRow === nrOfQuestions}
								onClick={checkAnswer}
								key={answer}
							>
								<div>{decodeHtmlEntities(answer)}</div>
							</button>
						))}
					</div>
					{console.log(correctAnswersInRow)}
				</div>
			)}
		</>
	);
}
