// PlanHistory controlls

const planHistory = require("../schema/PlanHistory");
const Edit = require("./edit");

class PlanHistory extends Edit {
	constructor(schema){
		super(schema);
	}
}

module.exports = new PlanHistory(planHistory);