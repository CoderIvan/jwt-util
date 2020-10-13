function base64ToBase64Url(string) {
	return string.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
}

function padString(input) {
	const segmentLength = 4
	const stringLength = input.length
	const diff = stringLength % segmentLength

	if (!diff) {
		return input
	}

	let position = stringLength
	let padLength = segmentLength - diff
	const paddedStringLength = stringLength + padLength
	const buffer = Buffer.alloc(paddedStringLength)

	buffer.write(input)

	// eslint-disable-next-line no-plusplus
	while (padLength--) {
		// eslint-disable-next-line no-plusplus
		buffer.write('=', position++)
	}

	return buffer.toString()
}

function base64UrlToBase64(string) {
	return padString(string.toString())
		.replace(/-/g, '+')
		.replace(/_/g, '/')
}

function base64UrlDecode(string) {
	return JSON.parse(Buffer.from(base64ToBase64Url(string), 'base64').toString())
}

function base64UrlEncode(json) {
	return base64ToBase64Url(Buffer.from(JSON.stringify(json)).toString('base64'))
}

module.exports = {
	base64ToBase64Url,
	base64UrlToBase64,
	base64UrlDecode,
	base64UrlEncode,
}
