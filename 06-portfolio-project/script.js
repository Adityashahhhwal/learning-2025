function toggleMenu() {
	const menu = document.querySelector('.menu-links');
	const icon = document.querySelector('.hamburger-icon');

	if (!menu || !icon) {
		return;
	}

	menu.classList.toggle('open');
	icon.classList.toggle('open');
}

const THEME_KEY = 'portfolio-theme';
const THEME_ANIMATION_CLASS = 'is-animating';
const THEME_TRANSITION_CLASS = 'theme-transitioning';

function runThemeTransition() {
	document.body.classList.remove(THEME_TRANSITION_CLASS);
	void document.body.offsetWidth;
	document.body.classList.add(THEME_TRANSITION_CLASS);

	window.setTimeout(() => {
		document.body.classList.remove(THEME_TRANSITION_CLASS);
	}, 580);
}

function animateThemeIcons() {
	const themeIcons = document.querySelectorAll('.theme-icon');

	themeIcons.forEach((icon) => {
		icon.classList.remove(THEME_ANIMATION_CLASS);
		void icon.offsetWidth;
		icon.classList.add(THEME_ANIMATION_CLASS);
	});

	window.setTimeout(() => {
		themeIcons.forEach((icon) => icon.classList.remove(THEME_ANIMATION_CLASS));
	}, 540);
}

function applyTheme(mode) {
	const isDark = mode === 'dark';
	document.body.classList.toggle('dark-mode', isDark);
	document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

	const themedImages = document.querySelectorAll('[data-light][data-dark]');
	themedImages.forEach((image) => {
		image.src = isDark ? image.dataset.dark : image.dataset.light;
	});

	localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

function toggleTheme() {
	const isDarkNow = document.body.classList.contains('dark-mode');
	animateThemeIcons();
	runThemeTransition();
	applyTheme(isDarkNow ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
	const savedTheme = localStorage.getItem(THEME_KEY);
	applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
});