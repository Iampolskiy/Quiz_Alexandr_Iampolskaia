import React from 'react';
import ReactDOM from 'react-dom/client';
import Quiz from './components/Quiz.jsx';
import SelectCategiries from './components/SelectCategiries.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SelectCategiries />
	</React.StrictMode>
);
