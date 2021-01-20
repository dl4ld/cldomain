const cmdArgs = require('command-line-args')
const secureAmqp = require('../cllibsecureamqp')

const cmdOptions = [
	{ name: 'send', alias: 's', type: String},
	{ name: 'config', alias: 'c', type: String}
]
const options = cmdArgs(cmdOptions)
options.config = options.config || "./config"
const config = require(options.config)
const toAddress = options.send
const oneYear = 525949

async function main() {
	await secureAmqp.init(config)
	const myAddress = secureAmqp.getMyAddress()
	console.log("Actor: ", myAddress)

	secureAmqp.registerFunction('.f.signActorId', null, function(req, res) {
		console.log("Authorize actor ", req)
		// check address against whitelist
		// sign identity
		const token = secureAmqp.signedToken(req.msg, oneYear)
		console.log("token: ", token)
		res.send(token)
	})
}

main()


