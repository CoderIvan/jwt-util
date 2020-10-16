# jwt-util

![Node.js CI](https://github.com/CoderIvan/jwt-util/workflows/Node.js%20CI/badge.svg)

## 目的

通过自己撸代码实现，加深对[JWT](https://jwt.io/introduction/)技术原理的理解

API接口参照[node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

目前只实现了`HS256`、`RS256`、`ES256`

## 使用
```javascript
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
```

其它见[example](https://github.com/CoderIvan/jwt-util/tree/main/example)
