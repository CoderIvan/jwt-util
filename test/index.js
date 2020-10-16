const { expect } = require('chai')
const fs = require('fs')

const jwt = require('../lib')

describe('all', () => {
	describe('#1 HS256', () => {
		const secret = 'your-256-bit-secret'
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

		it('sign', () => {
			const result = jwt.sign(
				{
					sub: '1234567890',
					name: 'John Doe',
					iat: 1516239022,
				},
				secret,
				{
					algorithm: 'HS256',
				}
			)

			expect(result).to.eql(token)
		})

		it('verify', () => {
			const result = jwt.verify(token, secret)

			expect(result).to.eql(true)
		})
	})

	describe('#1 RS256', () => {
		const token = [
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
			'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0',
			'POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA',
		].join('.')

		const privateKey = fs.readFileSync(`${__dirname}/rs256/private.key`)
		const publicKey = fs.readFileSync(`${__dirname}/rs256/public.key`)

		it('sign', () => {
			const result = jwt.sign(
				{
					sub: '1234567890',
					name: 'John Doe',
					admin: true,
					iat: 1516239022,
				},
				privateKey,
				{
					algorithm: 'RS256',
				}
			)

			expect(result).to.eql(token)
		})

		it('verify', () => {
			const result = jwt.verify(token, publicKey)

			expect(result).to.eql(true)
		})
	})

	describe('#1 ES256', () => {
		const privateKey = fs.readFileSync(`${__dirname}/es256/private.key`)
		const publicKey = fs.readFileSync(`${__dirname}/es256/public.key`)

		it('verify', () => {
			const token = [
				'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9',
				'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0',
				'tyh-VfuzIxCyGYDlkBA7DfyjrqmSHu6pQ2hoZuFqUSLPNY2N0mpHb3nk5K17HWP_3cYHBw7AhHale5wky6-sVA',
			].join('.')

			const result = jwt.verify(token, publicKey)

			expect(result).to.eql(true)
		})

		it('sign & verify', () => {
			const token = jwt.sign(
				{
					sub: '1234567890',
					name: 'John Doe',
					admin: true,
					iat: 1516239022,
				},
				privateKey,
				{
					algorithm: 'ES256',
				}
			)

			const result = jwt.verify(token, publicKey)

			expect(result).to.eql(true)
		})
	})
})
