require('../css/main.scss')
require('./page.scss')
const { MainFunctions } = require('../js/base.js')

document.addEventListener('DOMContentLoaded', function () {
	window.MainFunctions = MainFunctions.instance();
	window.MainFunctions.initialize();

	const images = document.querySelectorAll('.screen_event .images .image');
	const wrapper = document.querySelector('.screen_event .images');

	const options = {
		root: wrapper,
		rootMargin: '0px',
		threshold: 0.99
	}

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
			}
			else {
				entry.target.classList.remove('active');
			}
		})
	}, options)

	images.forEach(image => {
        observer.observe(image)
    })
})