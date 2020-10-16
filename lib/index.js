const jwtUtil = require('./jwt')
const algorithm = require('./algorithm')

function sign(payload, secretOrPrivateKey, options) {
	return jwtUtil.sign(
		{
			alg: options.algorithm,
			typ: 'JWT',
		},
		payload,
		secretOrPrivateKey,
		algorithm[options.algorithm]
	)
}

function verify(token, secretOrPublicKey) {
	const {
		header: { alg },
	} = jwtUtil.getInfo(token)

	return jwtUtil.verify(token, secretOrPublicKey, algorithm[alg])
}

module.exports = {
	sign,
	verify,
}
