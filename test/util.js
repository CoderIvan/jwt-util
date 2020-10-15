const { expect } = require('chai')

const {
	fromBase64ToBase64Url,
	fromBase64UrlToBase64,
	base64UrlDecode,
	base64UrlEncode,
} = require('../lib/util')

describe('fromBase64ToBase64Url and fromBase64UrlToBase64', () => {
	describe('#1', () => {
		const base64URLString = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9'
		const base64String = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9'

		it('fromBase64ToBase64Url', () => {
			expect(fromBase64ToBase64Url(base64String)).to.eql(base64URLString)
		})

		it('fromBase64UrlToBase64', () => {
			expect(fromBase64UrlToBase64(base64URLString)).to.eql(base64String)
		})
	})

	describe('#2', () => {
		const base64URLString = 'eyJuYW1lIjoiSXZhbiIsImlhdCI6MTYwMjU3MDIyMn0'
		const base64String = 'eyJuYW1lIjoiSXZhbiIsImlhdCI6MTYwMjU3MDIyMn0='

		it('fromBase64ToBase64Url', () => {
			expect(fromBase64ToBase64Url(base64String)).to.eql(base64URLString)
		})

		it('fromBase64UrlToBase64', () => {
			expect(fromBase64UrlToBase64(base64URLString)).to.eql(base64String)
		})
	})
})

describe('base64UrlDecode and base64UrlEncode', () => {
	describe('#1', () => {
		const base64URLString = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9'
		const json = {
			alg: 'HS512',
			typ: 'JWT',
		}

		it('base64UrlDecode', () => {
			expect(base64UrlDecode(base64URLString)).to.eql(json)
		})

		it('fromBase64UrlToBase64', () => {
			expect(base64UrlEncode(json)).to.eql(base64URLString)
		})
	})

	describe('#2', () => {
		const base64URLString = 'eyJuYW1lIjoiSXZhbiIsImlhdCI6MTYwMjU3MDIyMn0'
		const json = {
			name: 'Ivan',
			iat: 1602570222,
		}

		it('base64UrlDecode', () => {
			expect(base64UrlDecode(base64URLString)).to.eql(json)
		})

		it('fromBase64UrlToBase64', () => {
			expect(base64UrlEncode(json)).to.eql(base64URLString)
		})
	})
})
