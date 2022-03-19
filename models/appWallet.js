// App Wallet class
const Edit = require("./edit");
const appWallet = require("../schema/AppWallet");

class AppWallet extends Edit {
	constructor(schema) {
		super(schema);
	}	
}
module.exports = new AppWallet(appWallet);