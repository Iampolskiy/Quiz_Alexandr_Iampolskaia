import ShowQuestion from './ShowQuestion';
import { useEffect, useState } from 'react';

export default function SelectCategiries() {
	const [fetchedCategories, setFetchedCategories] = useState([]);
	const [selectedCategorie, setSelectedCategorie] = useState([]);
	const [showCategories, setShowCategories] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [disabledButton, setDisabledButton] = useState(false);
	const [difficulty, setDifficulty] = useState('easy');
	const [difficultyLevel, setDifficultyLevel] = useState(1);
	const [quizType, setQuizType] = useState('multiple');
	const [typeLevel, setTypeLevel] = useState(1);
	const [nrOfQuestions, setNrOfQuestions] = useState(3);

	/* fetch Categories */
	async function fetchQuizCategories() {
		try {
			const response = await fetch('https://opentdb.com/api_category.php');
			if (response) {
				console.log('categories fetch OK');
			}
			const jsonData = await response.json();

			setFetchedCategories(jsonData.trivia_categories);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchQuizCategories();
	}, []);

	async function fetchQuizQuestions() {
		console.log(selectedCategorie);
		const mainUrl = 'https://opentdb.com/api.php?';

		const amountUrl = `amount=${nrOfQuestions}`;
		const codeUrl = `&encode=url3986`;
		const categoryUrl =
			selectedCategorie.length !== 0 ? `&category=${selectedCategorie.id}` : '';
		const difficultUrl =
			difficulty !== undefined ? `&difficulty=${difficulty}` : '';
		const quizTypeUrl = quizType !== 'random' ? `&type=${quizType}` : '';
		const urlString = `${mainUrl}${amountUrl}${categoryUrl}${difficultUrl}${quizTypeUrl}`;
		console.log(urlString);

		try {
			const response = await fetch(urlString);
			if (response) {
				console.log('questions fetch OK');
				/* console.log('questions fetch OK'); */
			}
			const jsonData = await response.json();
			console.log(jsonData);
			console.log(jsonData.response_code);
			if (jsonData.response_code === 1) {
				console.log(jsonData.response_code);
				alert(
					'Not enough questions available. Pls lower the amount of questions or select a different category.'
				);
			}
			const questions = jsonData.results;
			console.log(questions);
			setQuestions(questions);

			console.log(questions);
		} catch (error) {
			console.log(error);
		}

		setDisabledButton(true);
		setTimeout(() => {
			setDisabledButton(false);
		}, 5000);
	}

	const handleCategoriesChange = (e) => {
		const selectedCatName = e.target.value;
		console.log(e.target.value);
		const category = fetchedCategories.find((c) => c.name === selectedCatName);
		setSelectedCategorie(category);
		setShowCategories(false);
	};

	const handleDifficultyButton = () => {
		const difficultyLevelArray = ['random', 'easy', 'medium', 'hard'];
		setDifficultyLevel(difficultyLevel < 3 ? difficultyLevel + 1 : 0);
		setDifficulty(difficultyLevelArray[difficultyLevel + 1]);
	};
	const toUpperCase = (text) => {
		if (text) {
			return text.charAt(0).toUpperCase() + text.slice(1);
		} else {
			return 'Random';
		}
	};

	const handleTypeButton = () => {
		const quizTypeArray = ['multiple', 'boolean', 'random'];
		setTypeLevel(typeLevel < 2 ? typeLevel + 1 : 0);
		setQuizType(quizTypeArray[typeLevel]);
	};

	return (
		<>
			<div className="menuButton_start">
				<button
					className="buttonStyle"
					disabled={disabledButton}
					onClick={fetchQuizQuestions}
				>
					Start Quiz
				</button>
			</div>
			<div className="menuButton_number">
				<button onClick={() => setNrOfQuestions(nrOfQuestions - 1)}>-</button>
				<div className="buttonStyle">Number of questions {nrOfQuestions}</div>
				<button onClick={() => setNrOfQuestions(nrOfQuestions + 1)}>+</button>
			</div>

			<div className="menuButton_type">
				<button onClick={() => handleTypeButton()}>
					{toUpperCase(quizType)}
				</button>
			</div>
			<div className="menuButton_level">
				<button
					onClick={() => {
						handleDifficultyButton();
					}}
				>
					{toUpperCase(difficulty)}
				</button>
			</div>
			<div className="menuButton_showCat">
				<button onClick={() => setShowCategories(!showCategories)}>
					{showCategories ? 'Hide Categories' : 'Show Categories'}
				</button>
			</div>
			{showCategories && (
				<div className="showCategories">
					{fetchedCategories.map(({ name, id }) => {
						return (
							<button
								className="categorieButton"
								key={id}
								onClick={(e) => {
									handleCategoriesChange(e);
								}}
								value={name}
							>
								{name}
							</button>
						);
					})}
					<button
						onClick={() => {
							setSelectedCategorie(''), setShowCategories(false);
						}}
					>
						Random
					</button>
				</div>
			)}

			<div>
				{selectedCategorie.name ? (
					<div>Category {selectedCategorie.name}</div>
				) : (
					<div>Category Random</div>
				)}
			</div>

			<div>
				{difficulty
					? 'Difficulty' + ' ' + toUpperCase(difficulty)
					: ' Difficulty Random'}
			</div>
			<div>
				{quizType ? 'Quiz Type' + ' ' + toUpperCase(quizType) : 'Type Random'}
			</div>
			<ShowQuestion
				questions={questions}
				selectedCategorieID={selectedCategorie.id}
				nrOfQuestions={nrOfQuestions}
			/>
		</>
	);
}
