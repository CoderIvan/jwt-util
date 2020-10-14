const { expect } = require('chai')
const fs = require('fs')

const { sign, verify } = require('../lib/jwt')
const { hs256, rs256 } = require('../lib/algorithm')

describe('jwt', () => {
	describe('#1 HS256', () => {
		const header = {
			alg: 'HS256',
			typ: 'JWT',
		}

		const payload = {
			sub: '1234567890',
			name: 'John Doe',
			iat: 1516239022,
		}

		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

		const secret = 'your-256-bit-secret'

		it('sign', () => {
			expect(sign(header, payload, secret, hs256)).to.eql(token)
		})

		it('verify', () => {
			expect(verify(token, secret, hs256)).to.eql(true)
		})
	})

	describe('#1 RS256', () => {
		const header = {
			alg: 'RS256',
			typ: 'JWT',
		}

		const payload = {
			sub: '1234567890',
			name: 'John Doe',
			admin: true,
			iat: 1516239022,
		}

		const token = [
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
			'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0',
			'POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA',
		].join('.')

		const privateKey = fs.readFileSync(`${__dirname}/rs256/private.key`)
		const publicKey = fs.readFileSync(`${__dirname}/rs256/public.key`)

		it('sign', () => {
			expect(sign(header, payload, privateKey, rs256)).to.eql(token)
		})

		it('verify', () => {
			expect(verify(token, publicKey, rs256)).to.eql(true)
		})
	})
})
