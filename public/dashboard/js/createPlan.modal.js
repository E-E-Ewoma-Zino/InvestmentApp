// This script helps to create plan

const newPlanForm = document.querySelector("[data-create-plan=\"true\"]");
const planInput = newPlanForm.querySelectorAll("input");
const planTextArea = newPlanForm.querySelectorAll("textarea").entries;
const planFormData = [...planInput, planTextArea];

newPlanForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const data = {
		name: planFormData[0].value,
		key: planFormData[1].value,
		min: planFormData[2].value,
		max: planFormData[3].value,
		description: planFormData[4].value,
	}

	// console.log("form", data);

	axios.post("/api/createPlan", data).then((res) => {
		console.log("res", res.data);

		messager({
			alert: "success",
			message: res.data.message,
			duration: 3000
		});
	}).catch((err) => {
		console.log("err", err.message);

		messager({
			alert: err.response.data.alert || "danger",
			message: err.response.data.err,
			duration: 6000
		});
	});
});