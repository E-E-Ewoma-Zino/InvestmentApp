// plas controlls
const plans = require("../schema/Plans");
const Edit = require("./edit");

class Plan extends Edit {
	constructor(schema) {
		super(schema);
	}
}

module.exports = new Plan(plans);