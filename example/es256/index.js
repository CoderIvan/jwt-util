const fs = require('fs')
const jwt = require('../../lib')

const privateKey = fs.readFileSync(`${__dirname}/private.key`)
const publicKey = fs.readFileSync(`${__dirname}/public.key`)

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

// eslint-disable-next-line no-console
console.log(token) // 由于ECDSA的特性，输出不固定。eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.n4-zj1SQWc7iZozsAOED2XHOs7mM-Hlq6FCiR_EIin2_QDPOMDavbH9GmdaeorlMwU8ZmKmsUjbfrPnPsH04iQ

const isValid = jwt.verify(token, publicKey)

// eslint-disable-next-line no-console
console.log(isValid) // 输出: true
