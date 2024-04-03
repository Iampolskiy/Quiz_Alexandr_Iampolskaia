import { useEffect, useState } from 'react';
export default function SelectCategiries() {
	const [fetchedCategories, setFetchedCategories] = useState([]);
	const [selectedCategorie, setSelectedCategorie] = useState([]);
	const [showCategories, setShowCategories] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [difficulty, setDifficulty] = useState(null);
	const [disabledButton, setDisabledButton] = useState(false);
	const [selectedOptionText, setSelectedOptionText] = useState('');
	const [open, setOpen] = useState(false);

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

	/*  fetch Questions with selected Categorie */

	async function fetchQuizQuestions() {
		console.log(selectedCategorie);
		if (selectedCategorie.length === 0) {
			try {
				const response = await fetch(
					difficulty
						? `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`
						: 'https://opentdb.com/api.php?amount=10'
				);
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
		} else {
			console.log(selectedCategorie);
			try {
				const response = await fetch(
					`https://opentdb.com/api.php?amount=10&category=${selectedCategorie.id}`
				);
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
	};

	const handleChangeDifficulty = (e) => {
		console.log(e.target.value);
		const selectedOption = e.target.options[e.target.selectedIndex].text;
		setSelectedOptionText(selectedOption);

		if (e.target.value === 'random') {
			setDifficulty(null);
		} else {
			setDifficulty(e.target.value);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<>
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
				</div>
			)}
			<div>
				{/* <button onClick={}>Select Difficulty</button> */}
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
			</div>
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
					? 'Difficulty' + ' ' + selectedOptionText
					: ' Difficulty Random'}
			</div>
		</>
	);
}
