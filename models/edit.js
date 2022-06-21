// A general file for CRUD 

class Edit {
	constructor(schema) {
		this.schema = schema;
	}

	// find all the itema of a specific schema
	async find(callback) {
		return await this.schema.find({}).exec(callback);
	}

	// find an item by it's id
	async findById(id, callback) {
		return await this.schema.findById({ _id: id }).exec(callback);
	}

	// find an item by it's name
	async findByName(name, callback) {
		return await this.schema.find({ name: name }).exec(callback);
	}

	// find all the items of a specific schema
	async findAndPopulate(option, callback) {
		return await this.schema.find({}).populate(option).exec(callback);
	}

	// find the item of a specific schema
	async findByIdAndPopulate(itemId, option, callback) {
		return await this.schema.findById({_id: itemId}).populate(option).exec(callback);
	}

	// this would create an item in the specified schema that calls this
	async create(items, callback) {
		return await this.schema.create(items, callback);
	}

	// delete an item
	async remove(id, callback) {
		return await this.schema.deleteOne({ _id: id }, callback);
	}

	// update an item
	async update({itemToupdateId, propertyToUpdate, optionsToUse, updateValue}, callback){
		// console.log("here", itemToupdateId, optionsToUse, propertyToUpdate, updateValue);
		// console.log("here", typeof itemToupdateId, typeof optionsToUse, typeof propertyToUpdate, typeof updateValue);
		return await this.schema.findOneAndUpdate(itemToupdateId, { [optionsToUse]: { [propertyToUpdate]: updateValue } }, callback);
	}
}

module.exports = Edit;