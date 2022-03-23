// Message Bird js

// using messageBird
const messageBox = document.getElementById("messageBox");

// message sender
function messager(data) {
	const messageBird = document.createElement("div");
	const message = document.createElement("div");
	const progressBar = document.createElement("span");

	progressBar.style.width = "100%";
	progressBar.style.backgroundColor = "#fff";
	progressBar.style.height = "4px";
	progressBar.style.zIndex = "4";
	progressBar.style.position = "absolute";
	progressBar.style.bottom = "0";
	progressBar.style.left = "0";

	
	messageBird.style.overflow = "hidden";
	
	messageBird.setAttribute("data-bird", "messageBird");	
	
	messageBird.setAttribute("class", `alert alert-${data.alert}`);
	message.style.color = "#fff";
	message.innerHTML = data.message;
	
	if (data.progressBar) messageBird.appendChild(progressBar);
	messageBird.appendChild(message);
	messageBox.appendChild(messageBird);

	// animate progres bar
	const width = messageBox.clientWidth;
	progressBar.animate([
		// keyframes
		{ transform: `translateX(0px)` },
		{ transform: `translateX(${width}px)` }
	], {
		// timing options
		duration: data.duration || 3000
	});
	// animate
	$("[data-bird=\"messageBird\"]").fadeIn(() => {
		setTimeout(() => {
			messageBird.remove();
			if (data.method) return data.method();
		}, data.duration || 3000);
	});
}
