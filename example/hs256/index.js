const jwt = require('../../lib')

const secret = 'your-256-bit-secret'

const token = jwt.sign(
	{
		sub: '1234567890',
		name: 'John Doe',
		admin: true,
		iat: 1516239022,
	},
	secret,
	{
		algorithm: 'HS256',
	}
)

console.log(token) // 输出: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.reGQzG3OKdoIMWLDKOZ4TICJit3EW69cQE72E2CfzRE

const isValid = jwt.verify(token, secret)

console.log(isValid) // 输出: true
