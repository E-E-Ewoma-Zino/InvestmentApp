// update the users profile
// the text part
const settingsPData = {
	firstname: document.querySelector(`[data-firstname]`).value,
	lastname: document.querySelector(`[data-lastname]`).value,
	phoneNo: document.querySelector(`[data-phoneNo]`).value,
	previousPassword: document.querySelector(`[data-password="previous"]`).value,
	newPassword: document.querySelector(`[data-password="new"]`).value,
	description: document.querySelector(`[data-description]`) && document.querySelector(`[data-description]`)
		.value,
	method: document.querySelector(`[data-method]`) && document.querySelector(`[data-method]`).value,
	duration: document.querySelector(`[data-duration]`) && document.querySelector(`[data-duration]`).value,
	increase: document.querySelector(`[data-increase]`) && document.querySelector(`[data-increase]`).value
}

// btn used to update the profile
const updateProfileBtn = document.querySelector(`[data-update-profile]`);
// this is the form that contains the file input field
const uploadForm = document.getElementById("uploadProfilePicForm");

// the image part
// the demoImg will hold the image src that is avaliable before the change.
const demoImg = document.querySelector(`[data-profile-img-demo]`);
const demoImgTmp = demoImg; // this is the what I would use to know if this image was updated

// the input field for the image file
const imgInput = document.getElementById("profile-img-file");

// this helps get the imagg to show in the dom even with out uploading it first
imgInput.addEventListener("change", e => {
	if (FileReader && e.target.files && e.target.files.length) {
		var fr = new FileReader();
		fr.onload = function () {
			demoImg.src = fr.result;
		}
		fr.readAsDataURL(e.target.files[0]);
	}
	// Not supported
	else {
		// fallback -- perhaps submit the input to an iframe and temporarily store
		// them on the server until the user's session ends.
		console.log("not supported");
	}
});

function updateProfile(e) {
	e.preventDefault();

	// text data
	const settingsData = {
		firstname: document.querySelector(`[data-firstname]`).value,
		lastname: document.querySelector(`[data-lastname]`).value,
		phoneNo: document.querySelector(`[data-phoneNo]`).value,
		previousPassword: document.querySelector(`[data-password="previous"]`).value,
		newPassword: document.querySelector(`[data-password="new"]`).value,
		description: document.querySelector(`[data-description]`) && document.querySelector(
			`[data-description]`).value,
		method: document.querySelector(`[data-method]`) && document.querySelector(`[data-method]`).value,
		duration: document.querySelector(`[data-duration]`) && document.querySelector(`[data-duration]`)
			.value,
		increase: document.querySelector(`[data-increase]`) && document.querySelector(`[data-increase]`)
			.value
	};

	// check if previousPassword is exist then check if user entered a new password 
	if (settingsData["previousPassword"]) {
		if (!settingsData["newPassword"]) return messager({
			alert: "danger",
			message: "Enter a new password!",
			duration: 3000,
		});
	}
	// check if previousPassword is exist then check if user entered a new password 
	if (settingsData["newPassword"]) {
		if (!settingsData["previousPassword"]) return messager({
			alert: "danger",
			message: "Enter your previous password!",
			duration: 3000,
		});
	}

	// file data
	const imageData = new FormData();
	console.log("demo Img", demoImg, "demoImgTmp", demoImgTmp);
	if (demoImg == demoImgTmp) imageData.append("image", uploadForm[0].files[0]);

	// for each of the fields check if it was updated and if it was, appent it
	for (s in settingsData) if (settingsPData[s] != settingsData[s]) imageData.append(s, settingsData[s]);

	// send the data
	axios.patch("/api/updateprofile", imageData).then((res) => {
		console.log("res:", res);
		if (res.data.bird.length) res.data.bird.forEach(bird => {
			messager({
				progressBar: false,
				alert: bird.alert,
				duration: 7000,
				message: bird.message
			});
		});
		else messager({
			method: ()=> location.reload(),
			progressBar: true,
			alert: res.data.alert || "success",
			duration: 3000,
			message: res.data.message
		});
	}).catch((err) => {
		console.error(":::err", err);
		
		if (err.response.data.bird.length) err.response.data.bird.forEach(bird => {
			messager({
				progressBar: false,
				alert: bird.alert,
				duration: 7000,
				message: bird.message
			});
		});
		else messager({
			progressBar: false,
			alert: err.response.data.alert || "danger",
			duration: 3000,
			message: err.response.data.message
		});
	});
}

// event listeners
updateProfileBtn.addEventListener("click", e => updateProfile(e));
uploadForm.onsubmit = e => updateProfile(e);
