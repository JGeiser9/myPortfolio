/* eslint-disable-next-line */
$(document).ready(() => {
	/* eslint-disable-next-line */
	toastr.options = {
		"progressBar": true,
		"positionClass": "toast-bottom-right",
		"preventDuplicates": true,
		"timeOut": "6000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	};
});

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
	let navItems = document.querySelectorAll(".navbar-item");
	let textArea = document.querySelector(".textArea");
	let burger = document.querySelector("#burger");
	let nav = document.querySelector("#navbar");
	let form = document.getElementById("contactForm");

	form.addEventListener("submit", sendMessage);

	// Smooth scroll to section when clicked and close navbar
	navItems.forEach( el => {
		let name = el.getAttribute("name");
		el.addEventListener("click", () => {
			document.querySelector(`.${name}Section`).scrollIntoView({
				behavior: "smooth"
			});
			burger.classList.remove("is-active");
			nav.classList.remove("is-active");
		});
	});

	textArea.addEventListener("keydown", () => {
		textArea.style.cssText = "height: auto";
		textArea.style.cssText = "height:" + textArea.scrollHeight + "px";
	});
})();

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevPos = window.pageYOffset;
window.onscroll = () => {
	let currentPos = window.pageYOffset;
	// Prevent hiding on upward scroll bouncing at top: 0
	if (currentPos > 0) {
		if (prevPos > currentPos) {
			document.querySelector(".navbar").style.top = "0";
		} else {
			document.querySelector(".navbar").style.top = "-55px";
		}
	}
	prevPos = currentPos;
};

// Submit function called from the form
/* eslint-disable-next-line */
function sendMessage(event) {
	event.preventDefault();
	let name = `${document.querySelector(".firstName").value} ${document.querySelector(".lastName").value}`,
		form = document.getElementById("contactForm"),
		email = `${document.querySelector(".email").value}`,
		textArea = `${document.querySelector(".textArea").value}`,
		url = "https://hooks.slack.com/services/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",
		message = {text: `Name: ${name}\nEmail: ${email}\nMessage: ${textArea}`},
		slackMessage = JSON.stringify(message);
	console.log("clicked");

	//AJAX request to handle search results
	const xhr = new XMLHttpRequest();
	if (message !== 0) {
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				toastr.success("I will get back to you soon", "Thank You");
			} else if (xhr.readyState == 4 && xhr.status !== 200) {
				toastr.error("Please try again or report issue <div><a class=\"toastLink\" href=\"https://github.com/JGeiser9/myPortfolio/issues\" target=\"_blank\" rel=\"noopener noreferrer\">here</a></div>", "Whoops");
				console.log("Error" + xhr.responseText);
			}
		};
		xhr.open("POST", url);
		xhr.send(slackMessage);
		form.reset();
	}
}
