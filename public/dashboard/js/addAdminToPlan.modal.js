// This script adds admin to plan

const addAdminBtn = document.querySelector("[data-bs-addAdmin=\"true\"]");

addAdminBtn.addEventListener("click", (e) => {

	const data = {
		plan: e.target.value
	}

	// console.log("e", e.target.value);
	axios.patch("/api/addAdminToPlan", data, {
		delay: 3000
	}).then((res) => {
		console.log("res", res.data);

		messager({
			alert: res.data.alert || "success",
			message: res.data.message,
			duration: 3000
		});
	}).catch((err) => {
		messager({
			alert: err.response.data.alert || "danger",
			message: err.response.data.err,
			duration: 5000
		});
	});
});