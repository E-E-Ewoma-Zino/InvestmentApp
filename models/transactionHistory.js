// transactionHistory controlls

const transactionHistory = require("../schema/TransactionHistory");
const Edit = require("./edit");

class Transaction extends Edit {
	constructor(schema){
		super(schema);
	}
}

module.exports = new Transaction(transactionHistory);