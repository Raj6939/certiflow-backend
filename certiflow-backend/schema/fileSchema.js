const mongoose = require("../mongoose");
const Schema = mongoose.Schema;
var fileSchema = new Schema({
	name: String,
	desc: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
});

const fileModel = new mongoose.model('files', fileSchema);;
module.exports = fileModel;