import { useEffect, useState } from 'react';

export default function SelectCategiries() {
	const [fetchedCategories, setFetchedCategories] = useState([]);
	const [selectedCategorie, setSelectedCategorie] = useState([]);
	const [showCategories, setShowCategories] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [difficulty, setDifficulty] = useState('random');
	const [disabledButton, setDisabledButton] = useState(false);
	/* const [selectedOptionText, setSelectedOptionText] = useState(''); */

	const [difficultyLevel, setDifficultyLevel] = useState(1);
	const [difficultyUrlState, setDifficultyUrlState] = useState('');

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
		const mainUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
		const categoryUrl =
			selectedCategorie.length !== 0 ? `&category=${selectedCategorie.id}` : '';
		const difficultUrl =
			difficulty !== 'random' ? `&difficulty=${difficulty}` : '';
		/* const difficultUrl = difficultUrlstate; */
		const urlString = `${mainUrl}${categoryUrl}${difficultUrl}`;
		console.log(urlString);

		try {
			const response = await fetch(urlString);
			if (response) {
				console.log('questions fetch OK');
			}
			const jsonData = await response.json();
			console.log(jsonData);
			const questions = jsonData.results;
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

	/* const handleChangeDifficulty = (e) => {
		console.log(e.target.value);
		const selectedOption = e.target.options[e.target.selectedIndex].text;
		setSelectedOptionText(selectedOption);

		if (e.target.value === 'random') {
			setDifficulty(null);
		} else {
			setDifficulty(e.target.value);
		}
	}; */

	const handleDifficultyButton = () => {
		const difficultyLevelArray = ['random', 'easy', 'medium', 'hard'];
		setDifficultyLevel(difficultyLevel < 3 ? difficultyLevel + 1 : 0);

		console.log(difficultyLevel);

		setDifficulty(difficultyLevelArray[difficultyLevel]);

		/* 	difficultyLevelArray.map((level) => {
			console.log(difficultyLevel);
			console.log(difficultyLevelArray[difficultyLevel]);
			if (difficultyLevelArray[difficultyLevel] === 'random') {
				setDifficulty(null);
			} else {
				setDifficulty(difficultyLevelArray[difficultyLevel]);
			}
			setDifficulty(difficultyLevelArray[difficultyLevel]);
		}); */

		/* const test = difficultyLevelArray[difficultyLevel];
		console.log(test);

		if (difficultyLevelArray[difficultyLevel] === 'random') {
			setDifficulty(test);
		} */
	};

	/* console.log(difficulty);
	console.log(difficultyLevel); */

	const toUpperCase = (text) => {
		if (text) {
			return text.charAt(0).toUpperCase() + text.slice(1);
		} else {
			return 'randomsdfsdf';
		}
	};

	return (
		<>
			<button
				onClick={() => {
					/* setDifficultyLevel(difficultyLevel < 3 ? difficultyLevel + 1 : 0), */
					handleDifficultyButton();
				}}
			>
				{toUpperCase(difficulty)}
				{/* {difficulty ? difficulty : 'random'} */}
			</button>
			<button onClick={() => setShowCategories(!showCategories)}>
				{showCategories ? 'Hide Categories' : 'Show Categories'}
			</button>
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
					<button onClick={() => setSelectedCategorie('')}>Random</button>
				</div>
			)}
			{/* <div>
				<label htmlFor="difficulty_select">Dificulty </label>
				<select
					name="difficulty_select"
					id="difficulty_select"
					onChange={handleChangeDifficulty}
				>
					<option value={'random'}>Random</option>
					<option value={'easy'}>Easy</option>
					<option value={'medium'}>Medium</option>
					<option value={'hard'}>Hard</option>
				</select>
			</div> */}
			<button disabled={disabledButton} onClick={fetchQuizQuestions}>
				fetchQuestions
			</button>
			<div>
				{selectedCategorie.name ? (
					<p>Category {selectedCategorie.name}</p>
				) : (
					<p>Category Random</p>
				)}
			</div>

			<div>
				{difficulty
					? 'Difficulty' + ' ' + toUpperCase(difficulty)
					: ' Difficulty Random'}
			</div>
		</>
	);
}
