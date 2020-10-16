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
		algorithm: 'RS256',
	}
)

// 输出
// eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9
// eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0
// D4kXa3UspFjRA9ys5tsD4YDyxxam3l_XnOb3hMEdPDTfSLRHPv4HPwxvin-pIkEmfJshXPSK7O4zqSXWAXFO52X-upJjFc_gpGDswctNWpOJeXe1xBgJ--VuGDzUQCqkr9UBpN-Q7TE5u9cgIVisekSFSH5Ax6aXQC9vCO5LooNFx_WnbTLNZz7FUia9vyJ544kLB7UcacL-_idgRNIWPdd_d1vvnNGkknIMarRjCsjAEf6p5JGhYZ8_C18g-9DsfokfUfSpKgBR23R8v8ZAAmPPPiJ6MZXkefqE7p3jRbA--58z5TlHmH9nTB1DYE2872RYvyzG3LoQ-2s93VaVuw
console.log(token)

const isValid = jwt.verify(token, publicKey)

console.log(isValid) // 输出: true
