class MainFunctions {
	constructor() {

	}

	static instance() {
		return new MainFunctions()
	}

	initialize() {
		try {
			let checks = document.querySelectorAll('.check');

			checks.forEach((check) => {
				check.addEventListener('click', (e) => {
					let box_icon = check.querySelector('.box .icon');

					if (box_icon.classList.contains('active')) {
						box_icon.classList.remove('active');
					}
					else {
						box_icon.classList.add('active');
					}
				});
			})
		}
		catch { }

		try {
			let menu = document.querySelector('.menu');

			window.addEventListener('scroll', () => {
				if (document.body.scrollTop > 115 || document.documentElement.scrollTop > 115) {
					menu.classList.add('fixed');
				}
				else {
					menu.classList.remove('fixed');
				}
			})
		}
		catch { }

		const paged = document.querySelectorAll('.paged');

		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.5
		}

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					document.getElementById('menu_' + entry.target.id).classList.add('active');
				}
				else {
					document.getElementById('menu_' + entry.target.id).classList.remove('active');
				}
			})
		}, options)

		paged.forEach(page => {
			observer.observe(page)
		})

		const to_up_observed = document.querySelectorAll('.to_up_observed');

		const options_to_up = {
			root: null,
			rootMargin: '0px',
			threshold: 0.5
		}

		const to_up_observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					document.getElementById('to_up').classList.add('inactive');
				}
				else {
					document.getElementById('to_up').classList.remove('inactive');

					if (document.documentElement.scrollTop == 0) {
						document.getElementById('to_up').classList.add('inactive');
					}
				}
			})
		}, options_to_up)

		to_up_observed.forEach(elem => {
			to_up_observer.observe(elem)
		})
	}
}

module.exports = {
	MainFunctions
}