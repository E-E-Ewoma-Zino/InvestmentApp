// control user schema
// const plans = require("./planssss");
const users = require("../schema/Users");
const Edit = require("./edit");

class User extends Edit {
	constructor(schema) {
		super(schema);
	}
}

module.exports = new User(users);