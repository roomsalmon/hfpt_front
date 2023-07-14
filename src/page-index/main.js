require('../css/main.scss')
require('./page.scss')
const { MainFunctions } = require('../js/base.js')

document.addEventListener('DOMContentLoaded', function () {
	window.MainFunctions = MainFunctions.instance();
	window.MainFunctions.initialize();

	const events = document.querySelectorAll('.event');
	const wrapper = document.querySelector('.screen_five .wrapper');

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

	events.forEach(event => {
        observer.observe(event)
    })
})


