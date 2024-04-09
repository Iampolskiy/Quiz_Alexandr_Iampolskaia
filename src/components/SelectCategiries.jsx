import ShowQuestion from './ShowQuestion';
import { useEffect, useState } from 'react';
import { toUpperCase } from '../helpers/helpers';

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
	const [categoryButtonText, setCategoryButtonText] = useState('Random');
	const [visible, setVisible] = useState(true);

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
				setVisible(true);
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
	/* const colorArray = ['random', 'easy', 'medium', 'hard']; */

	const handleDifficultyButton = (/* e */) => {
		const difficultyLevelArray = ['random', 'easy', 'medium', 'hard'];
		setDifficultyLevel(difficultyLevel < 3 ? difficultyLevel + 1 : 0);
		setDifficulty(difficultyLevelArray[difficultyLevel + 1]);
		/* colorArray.forEach((color) => {
			e.target.classList.remove(color);
		});
		e.target.classList.add(colorArray[difficultyLevel]); */
	};

	const handleTypeButton = () => {
		const quizTypeArray = ['multiple', 'boolean', 'random'];
		setTypeLevel(typeLevel < 2 ? typeLevel + 1 : 0);
		setQuizType(quizTypeArray[typeLevel]);
	};

	() => setCategoryButtonText(selectedCategorie);

	console.log(categoryButtonText);

	return (
		<>
			<div className={visible ? 'all' : 'none'}>
				<div className="menuButton_number">
					<button
						disabled={nrOfQuestions <= 1}
						onClick={() => setNrOfQuestions(nrOfQuestions - 1)}
					>
						-
					</button>
					<div className="buttonStyle">Questions {nrOfQuestions}</div>
					<button onClick={() => setNrOfQuestions(nrOfQuestions + 1)}>+</button>
				</div>

				<div className="menuButton_type">
					<button onClick={() => handleTypeButton()}>
						Type {toUpperCase(quizType)}
					</button>
				</div>
				<div className="menuButton_level">
					<button
						onClick={(e) => {
							handleDifficultyButton(e);
						}}
					>
						{toUpperCase(difficulty)}
					</button>
				</div>
				<div className="menuButton_showCat">
					<button onClick={() => setShowCategories(!showCategories)}>
						{/* {showCategories ? selectedCategorie.name : 'Change Categorie'} */}
						{/* {showCategoriesNames} */}
						{selectedCategorie.name
							? selectedCategorie.name
							: 'Categorie Random'}
					</button>
				</div>
				<div className="menuButton_start">
					<button
						className="buttonStyle"
						disabled={disabledButton}
						onClick={() => {
							fetchQuizQuestions();
							setVisible(false);
						}}
					>
						Start Quiz
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
			</div>
			<ShowQuestion
				questions={questions}
				/* selectedCategorieID={selectedCategorie.id} */
				nrOfQuestions={nrOfQuestions}
				selectedCategorie={selectedCategorie}
				difficulty={difficulty}
				quizType={quizType}
			/>
		</>
	);
}
