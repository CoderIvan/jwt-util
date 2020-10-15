const crypto = require('crypto')
const formatEcdsa = require('ecdsa-sig-formatter')

module.exports = {
	sign(data, key) {
		const sign = crypto.createSign('RSA-SHA256')
		sign.update(data)
		sign.end()
		return formatEcdsa.derToJose(
			sign.sign(crypto.createPrivateKey(key)),
			'ES256'
		)
	},
	verify(data, key, signature) {
		const verify = crypto.createVerify('RSA-SHA256')
		verify.update(data)
		verify.end()
		return verify.verify(
			crypto.createPublicKey(key),
			formatEcdsa.joseToDer(signature.toString('base64'), 'ES256')
		)
	},
}
