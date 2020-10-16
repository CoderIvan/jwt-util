const {
	base64UrlDecode,
	base64UrlEncode,
	fromBase64ToBase64Url,
	fromBase64UrlToBase64,
} = require('./util')

function sign(header, payload, key, algorithm) {
	const base64UrlHeader = base64UrlEncode(header)
	const base64UrlPayload = base64UrlEncode(payload)
	const verifySignature = algorithm.sign(
		`${base64UrlHeader}.${base64UrlPayload}`,
		key
	)
	const base64UrlVerifySignature = fromBase64ToBase64Url(
		verifySignature.toString('base64')
	)
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
		Buffer.from(fromBase64UrlToBase64(base64UrlVerifySignature), 'base64')
	)

	return result
}

function getInfo(token) {
	const [base64UrlHeader, base64UrlPayload] = token.split('.')

	return {
		header: base64UrlDecode(base64UrlHeader),
		payload: base64UrlDecode(base64UrlPayload),
	}
}

module.exports = {
	sign,
	verify,
	getInfo,
}
