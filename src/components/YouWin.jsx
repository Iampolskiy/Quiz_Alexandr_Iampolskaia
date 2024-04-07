import {} from 'react';

export default function YouWin({ correctAnswersInRow, incorrectAnswers }) {
	function reload() {
		location.reload();
	}
	console.log(correctAnswersInRow);
	return (
		<>
			<h1>YouWin</h1>
			{`U answered ${correctAnswersInRow} questions correctly and U made ${incorrectAnswers} mistakes in total.`}
			<button onClick={reload}>New Game</button>
		</>
	);
}
