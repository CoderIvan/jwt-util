const { expect } = require('chai')

const jwt = require('../lib')

describe('jwt', () => {
	describe('#1 HS256', () => {
		const secret = 'your-256-bit-secret'
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

		it.only('sign', () => {
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
})
