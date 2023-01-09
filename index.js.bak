console.log('Sedang dimulai...')
require('dotenv').config(), require('rootpath')(), require('./server')
const { spawn: spawn } = require('child_process'), path = require('path'), colors = require('@colors/colors/safe'), CFonts = require('cfonts')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1;
process.on('uncaughtException', console.error)
function start() {
	let args = [path.join(__dirname, 'client.js'), ...process.argv.slice(2)]
	let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
	.on('message', data => {
		if (data == 'reset') {
			console.log('Sedang direstart...')
			p.kill()
			start()
			delete p
		}
	})
	.on('exit', code => {
		console.error('Keluar dengan kode :', code)
		if (code == 1) start()
	})
}

CFonts.say('NOLEP BOT', {
   font: 'tiny',
   align: 'center',
   colors: ['system']
}), CFonts.say('Instagram : @dandisubhani_', {
   colors: ['system'],
   font: 'console',
   align: 'center'
}), start()