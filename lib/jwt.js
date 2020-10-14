const {
	base64UrlEncode,
	base64ToBase64Url,
	base64UrlToBase64,
} = require('./util')

function sign(header, payload, key, algorithm) {
	const base64UrlHeader = base64UrlEncode(header)
	const base64UrlPayload = base64UrlEncode(payload)
	const verifySignature = algorithm.sign(
		`${base64UrlHeader}.${base64UrlPayload}`,
		key
	)
	const base64UrlVerifySignature = base64ToBase64Url(verifySignature)
	return [base64UrlHeader, base64UrlPayload, base64UrlVerifySignature].join('.')
}

function verify(token, key, algorithm) {
	const [
		base64UrlHeader,
		base64UrlPayload,
		base64UrlVerifySignature,
	] = token.split('.')

	const result = algorithm.verify(
		`${base64UrlHeader}.${base64UrlPayload}`,
		key,
		base64UrlToBase64(base64UrlVerifySignature)
	)

	return result
}

module.exports = {
	sign,
	verify,
}