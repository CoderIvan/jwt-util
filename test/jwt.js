const crypto = require('crypto')
const { expect } = require('chai')

const { sign, verify } = require('../lib/jwt')

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

		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

		const secret = 'your-256-bit-secret'
		const algorithm = {
			sign(data, key) {
				return crypto.createHmac('sha256', key).update(data).digest('base64')
			},
			verify(data, key, signature) {
				return this.sign(data, key) === signature
			},
		}

		it('sign', () => {
			expect(sign(header, payload, secret, algorithm)).to.eql(token)
		})

		it('verify', () => {
			expect(verify(token, secret, algorithm)).to.eql(true)
		})
	})
})
