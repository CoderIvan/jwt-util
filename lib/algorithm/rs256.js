const crypto = require('crypto')

module.exports = {
	sign(data, key) {
		const sign = crypto.createSign('RSA-SHA256')
		sign.update(data)
		sign.end()
		return sign.sign(crypto.createPrivateKey(key))
	},
	verify(data, key, signature) {
		const verify = crypto.createVerify('RSA-SHA256')
		verify.update(data)
		verify.end()
		return verify.verify(crypto.createPublicKey(key), signature)
	},
}
