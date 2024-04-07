export default function YouWin({ correctAnswersInRow, incorrectAnswers }) {
	console.log(correctAnswersInRow);
	return (
		<>
			<h1>YouWin</h1>
			{`U answered ${correctAnswersInRow} questions correctly and U made ${incorrectAnswers} mistakes in total.`}
		</>
	);
}
