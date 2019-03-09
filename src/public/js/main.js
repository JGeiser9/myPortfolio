document.addEventListener("DOMContentLoaded", () => {
	// Get all "navbar-burger" elements
	const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

	// Check if there are any navbar burgers
	if (navbarBurgers.length > 0) {
		// Add a click event on each of them
		navbarBurgers.forEach( el => {
			el.addEventListener("click", () => {

				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const elTarget = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle("is-active");
				elTarget.classList.toggle("is-active");
			});
		});
	}
});

// Event Listeners
(() => {
	// Declaration of variables to navbar options
	let home = document.querySelector(".homeNav");
	let about = document.querySelector(".aboutNav");
	let projects = document.querySelector(".projectsNav");
	let contact = document.querySelector(".contactNav");
	let textArea = document.querySelector(".textArea");

	// Listen for clicks and scroll to the section
	home.addEventListener("click", () => {
		document.querySelector(".heroSection").scrollIntoView({
			behavior: "smooth"
		});
	});

	about.addEventListener("click", () => {
		document.querySelector(".aboutSection").scrollIntoView({
			behavior: "smooth"
		});
	});

	projects.addEventListener("click", () => {
		document.querySelector(".projectSection").scrollIntoView({
			behavior: "smooth"
		});
	});

	contact.addEventListener("click", () => {
		document.querySelector(".contactSection").scrollIntoView({
			behavior: "smooth"
		});
	});

	textArea.addEventListener("keydown", autosize);
})();

function autosize() {
	let el = this;
	el.style.cssText = "height: auto";
	el.style.cssText = "height:" + el.scrollHeight + "px";
}
