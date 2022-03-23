// This script helps to resolve a user

const resolveForm = document.querySelectorAll(`[data-resolve-user="true"]`);

for (let i = 0; i < resolveForm.length; i++) {
	const form = resolveForm[i];

	form.addEventListener("submit", e => {
		e.preventDefault();
		const data = {
			user: form[2].value,
			plan: form[1].value,
			amount: form[0].value
		}
		// console.log("inputs", data);

		axios.patch("/api/resolveUser", data).then(res => {
			console.log("data", res);
			messager({
				progressBar: true,
				method: () => location.reload(),
				alert: res.data.alert || "success",
				message: res.data.message,
				duration: 3000
			});
		}).catch(err => {
			console.error("err", err.response);
			messager({
				progressBar: true,
				alert: err.response.data.alert || "danger",
				message: err.response.data.err,
				duration: 6000
			});
		});
	});
}