const crypto = require('crypto')

module.exports = {
	sign(data, key) {
		return crypto.createHmac('sha256', key).update(data).digest()
	},
	verify(data, key, signature) {
		return this.sign(data, key).equals(signature)
	},
}
