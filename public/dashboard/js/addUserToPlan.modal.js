// This script adds a user to a plan

const addUserForm = document.querySelector("[data-form-addUser=\"true\"]");
const amountEntered = addUserForm.querySelector("input");

function getData({ adminId, planId }) {

	addUserForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = {
			amount: amountEntered.value,
			admin: adminId,
			plan: planId
		}

		console.log("data", data);
		axios.patch("/api/addUserToPlan", data).then((res) => {
			console.log("res", res);

			messager({
				alert: "success",
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
}