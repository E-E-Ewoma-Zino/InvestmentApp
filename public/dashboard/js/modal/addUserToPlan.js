// This script adds a user to a plan

const addUserForm = document.querySelector("[data-form-addUser=\"true\"]");
const amountEntered = addUserForm.querySelector("input");
const investorName = document.querySelector(`[data-set-investor-name="true"]`);

function getData({ adminName, adminId, planId }) {
	investorName.innerText = adminName;

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
				progressBar: true,
				method: () => location.reload(),
				alert: "success",
				message: res.data.message,
				duration: 3000
			});
		}).catch((err) => {
			messager({
				progressBar: false,
				alert: err.response.data.alert || "danger",
				message: err.response.data.err,
				duration: 5000
			});
		});
	});
}