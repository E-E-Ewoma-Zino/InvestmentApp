// Withdrawal controlls

const withdrawal = require("../schema/Withdrawal");
const Edit = require("./edit");

class Withdrawal extends Edit {
	constructor(schema){
		super(schema);
	}
}

module.exports = new Withdrawal(withdrawal);