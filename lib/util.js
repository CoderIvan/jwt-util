function fromBase64ToBase64Url(base64) {
	return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function fromBase64UrlToBase64(base64url) {
	let newBase64url = base64url.toString()

	while (newBase64url.length % 4 !== 0) {
		newBase64url += '='
	}

	return newBase64url.replace(/-/g, '+').replace(/_/g, '/')
}

function base64UrlDecode(string) {
	return JSON.parse(
		Buffer.from(fromBase64UrlToBase64(string), 'base64').toString()
	)
}

function base64UrlEncode(json) {
	return fromBase64ToBase64Url(
		Buffer.from(JSON.stringify(json)).toString('base64')
	)
}

module.exports = {
	fromBase64ToBase64Url,
	fromBase64UrlToBase64,
	base64UrlDecode,
	base64UrlEncode,
}
