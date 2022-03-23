// This script is concerned with crediting a users wallet

// get data form the cedit wellet #exampleModalLong
const creditWalletModal = document.querySelector("#exampleModalLong");
const creditInputs = creditWalletModal.querySelectorAll("input");
const creditSelect = creditWalletModal.querySelector("select");
const creditTextarea = creditWalletModal.querySelector("textarea");
const creditWallet = document.getElementById("creditWallet");
const creditFormData = [];
// combine all the form data
creditFormData.push(...creditInputs, creditSelect, creditTextarea);
// console.log(formData);

creditWallet.addEventListener("submit", e => {
	e.preventDefault();

	const data = {
		amount: creditFormData[0].value,
		currency: creditFormData[1].value,
		description: creditFormData[2].value
	}

	axios.patch("/api/credit", data).then((res) => {
		console.log("me", res);
		messager({
			progressBar: true,
			method: () => location.reload(),
			alert: "primary",
			message: "Wallet Credited"
		});

	}).catch(err => {
		messager({
			progressBar: true,
			alert: err.response.data.alert || "danger",
			message: err.response.data.err
		});
	});
});
