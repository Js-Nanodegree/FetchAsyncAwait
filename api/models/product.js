const mongoose = require('mongoose');
const crypty =require('crypty')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
		type: String,
		set: function(name) {
			const text = crypty.encrypt(name, 'P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O')
			return text
		}
    },
    surname: {
		type: String,
		set: function(name) {
			const text = crypty.encrypt(name, 'P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O')
			return text
		}
    },
    price: {
		type: String,
		set: function(price) {
			const text = crypty.decrypt(price, 'P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O')
			return text
		}
    },
})


module.exports = mongoose.model('Product', productSchema);