function toggleMenu(){
 const menu = document.querySelector('.menu-links');
 const icon = document.querySelector('.hamburger-icon');
 menu.classList.toggle('open');
 icon.classList.toggle('open');
}

const THEME_KEY = 'portfolio-theme';

function applyTheme(mode) {
	const isDark = mode === 'dark';
	document.body.classList.toggle('dark-mode', isDark);

	const themedImages = document.querySelectorAll('[data-light][data-dark]');
	themedImages.forEach((image) => {
		image.src = isDark ? image.dataset.dark : image.dataset.light;
	});

	localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

function toggleTheme() {
	const isDarkNow = document.body.classList.contains('dark-mode');
	applyTheme(isDarkNow ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
	const savedTheme = localStorage.getItem(THEME_KEY);
	applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
});