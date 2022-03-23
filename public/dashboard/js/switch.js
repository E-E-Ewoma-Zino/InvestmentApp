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
	});

	// show setting section
	settingSwitch.addEventListener("click", (e) => {
		location.hash = "#settings";
		disableSection(appSection);
		enableSection(settingSection);
	});

	if(location.hash == "#settings"){
		movingTab.style.width = "103px";
		movingTab.style.transform = "translate3d(194px, 0px, 0px)";
		disableSection(appSection);
		enableSection(settingSection);
	}else{
		movingTab.style.width = "81px";
		movingTab.style.transform = "translate3d(0px, 0px, 0px)";
		disableSection(settingSection);
		enableSection(appSection);
	}
});