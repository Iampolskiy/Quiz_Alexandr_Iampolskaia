export const toUpperCase = (text) => {
	if (text) {
		return text.charAt(0).toUpperCase() + text.slice(1);
	} else {
		return 'Random';
	}
};
