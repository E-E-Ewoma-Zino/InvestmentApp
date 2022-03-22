// this script helps an admin to leave a plan
const leavePlan = document.querySelector(`[data-leavePlan="true"]`);

leavePlan.addEventListener("click", e => {
	axios.patch("/api/leavePlan", {
		plan: e.target.value
	}).then(res => {
		// console.log("res", res);
		messager({
			alert: res.data.alert || "success",
			duration: 3000,
			message: res.data.message
		});
	}).catch(error => {
		messager({
			alert: error.response.data.alert || "danger",
			duration: 6000,
			message: error.response.data.err
		});
	});
});