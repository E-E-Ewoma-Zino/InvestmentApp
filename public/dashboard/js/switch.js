// This script is what helps to switch from app to settings in a page


$(() => {
	// switch
	const appSwitch = document.getElementById("appSwitch");
	const settingSwitch = document.getElementById("settingSwitch");
	// section
	const appSection = document.getElementById("appSection");
	const settingSection = document.getElementById("settingSection");
	// moving tab
	const movingTab = document.querySelector(".moving-tab");
	// to know if the profile pic is editable
	const profilePic = document.querySelector(`[data-profilePic]`);

	// disable section
	function disableSection(section) {
		$(section).fadeOut(500);
	}
	// enble section
	function enableSection(section) {
		$(section).fadeIn(500);
	}

	// show app section
	appSwitch.addEventListener("click", (e) => {
		disableSection(settingSection);
		enableSection(appSection);
		location.hash = "#app";
		profilePic.setAttribute("data-bs-toggle", "none");
		profilePic.setAttribute("data-profilePic", "no-edit");
		profilePic.setAttribute("data-bs-target", "none");
	});

	// show setting section
	settingSwitch.addEventListener("click", (e) => {
		location.hash = "#settings";
		disableSection(appSection);
		enableSection(settingSection);
		profilePic.setAttribute("data-bs-toggle", "modal");
		profilePic.setAttribute("data-profilePic", "editable");
		profilePic.setAttribute("data-bs-target", "#modal-form-update-profile");
	});

	if (location.hash.search("settings") == 1) {
		movingTab.style.width = "103px";
		profilePic.setAttribute("data-bs-toggle", "modal");
		profilePic.setAttribute("data-profilePic", "editable");
		profilePic.setAttribute("data-bs-target", "#modal-form-update-profile");
		movingTab.style.transform = "translate3d(194px, 0px, 0px)";
		disableSection(appSection);
		enableSection(settingSection);
	} else {
		movingTab.style.width = "81px";
		movingTab.style.transform = "translate3d(0px, 0px, 0px)";
		profilePic.setAttribute("data-bs-toggle", "none");
		profilePic.setAttribute("data-profilePic", "no-edit");
		profilePic.setAttribute("data-bs-target", "none");
		disableSection(settingSection);
		enableSection(appSection);
	}
});