
// fill the transaction modal with details

const description = document.querySelector(`[data-transaction-description="true"]`);
const status = document.querySelector(`[data-transaction-status="true"]`);
const alert = document.querySelector(`[data-transaction-alert="true"]`);
const amountInAppWallet = document.querySelector(`[data-transaction-amountInAppWallet="true"]`);
const methodOfPayment = document.querySelector(`[data-transaction-methodOfPayment="true"]`);
const fromWho = document.querySelector(`[data-transaction-fromWho="true"]`);
const toWho = document.querySelector(`[data-transaction-toWho="true"]`);
const createdAt = document.querySelector(`[data-transaction-time="true"]`);

function openTransaction(data) {
	try {
		alert.innerHTML = data.alert;
		amountInAppWallet.innerHTML = data.amountInAppWallet;
		methodOfPayment.innerHTML = data.methodOfPayment;
		fromWho.innerHTML = data.fromWho;
		toWho.innerHTML = data.toWho;
		// desc
		description.innerHTML = data.description == undefined || data.description == "" ? "No description" : data.description;
		// status
		if (data.status == 1) {
			status.innerHTML = `<span class = "badge badge-sm bg-gradient-success">Success</span>`;
		} else if (data.status == 0) {
			status.innerHTML = `<span class = "badge badge-sm bg-gradient-danger">Failed</span>`;
		} else {
			status.innerHTML = `<span class = "badge badge-sm bg-gradient-waring">Pending</span>`;
		}
		// time
		// mongoose date
		const timeOfTransaction = new Date(data.createdAt);
		// extract from mongoose the day, month, and year
		const [d, m, y] = [timeOfTransaction.getDate(), timeOfTransaction.getMonth(), timeOfTransaction.getFullYear()];
		// format the time of the transaction
		let time = `${d} - ${m} - ${y}`;
		createdAt.innerHTML = time;
	}catch(err){
		messager({
			alert: "danger",
			message: err.message,
			duration: 3000
		});
	}
}