// custom scripts are shared by all scripts

// navigation 
function navigateTo(params) {
	if (params.back) return history.back();
}

// Make sidebar link active
const sideBarUl = document.getElementById("sidebarUl");
const aTag = sideBarUl.querySelectorAll("a");

for (let i = 0; i < aTag.length; i++) {
	const tag = aTag[i];
	if (tag.pathname == location.pathname) {
		tag.classList.add("active");
	} else {
		tag.classList.remove("active");
	}
}