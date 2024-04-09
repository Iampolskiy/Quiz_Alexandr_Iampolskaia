import { toUpperCase } from '../helpers/helpers';
import '@animxyz/core';

export default function YouWin({
	correctAnswersInRow,
	incorrectAnswers,
	selectedCategorie,
	difficulty,
	quizType,
}) {
	function reload() {
		location.reload();
	}
	console.log(correctAnswersInRow);

	const score = correctAnswersInRow - incorrectAnswers;
	return (
		<>
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
			<div className="wonLost">
				{score > 0 ? (
					<h1 className="xyz-in" xyz="fade up">
						{' '}
						You won 💃🕺{' '}
					</h1>
				) : score === 0 ? (
					<h1 className="xyz-in" xyz="fade up">
						{' '}
						Its a draw 🤨
					</h1>
				) : (
					<h1 className="xyz-in" xyz="fade up">
						{' '}
						You lost 👎{' '}
					</h1>
				)}
			</div>
			<div className="result">
				<div
					className="scoreNumber  xyz-in  delay-2"
					xyz="fade up"
				>{`Your score is ${score}.`}</div>
				<div
					className="mistakesNumber xyz-in  delay-4"
					xyz="fade up"
				>{`You answered ${correctAnswersInRow} questions correctly and you made ${incorrectAnswers} mistakes in total.`}</div>
			</div>

			{/* className="question xyz-in" xyz="fade up delay-2" */}
			<div className="newGame xyz-in delay-4" xyz="fade up delay-2">
				<button className="newGameBtn" onClick={reload}>
					New Game
				</button>
			</div>
			<div className="info-container2YW">
				<div className="emojiHand"> 👍 {correctAnswersInRow}</div>
				<div className="emojiHand"> 👎 {incorrectAnswers}</div>
				<div>SCORE {score}</div>
			</div>
		</>
	);
}
