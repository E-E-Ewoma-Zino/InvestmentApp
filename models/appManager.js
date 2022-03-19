// AppWalletValue controlls

const manager = require("../schema/AppManager");
const Edit = require("./edit");

class Manager extends Edit {
	constructor(schema){
		super(schema);
	}

	async currentWalletValue(){
		try {
			return await this.find();
		} catch (error) {
			console.error("Ewoma you have an error here", error);
			return null;
		}
	}

	async convertUSDToAppWalletValue({amountInUSD: usd}){
		try {
			const walletValue = await this.currentWalletValue();
			return usd / walletValue[0].appWalletValue;
		} catch (err) {
			console.error("Ewoma you have an error here as well", err);
			return null;
		}
	}
}

module.exports = new Manager(manager);