
const cookieParser  = require('cookie-parser')
const { app }= require('./express')
const socketIOSession  = require('express-socket.io-session')
const { appSession, sessionStore,server } =require('./express')
const socketio = require('socket.io')(server)

const port = 4000
app.set('port', port)
app.set('host', process.env.SERVER_HOST || 'localhost')


server.listen(app.get('port'), app.get('localhost'), () => { // Запускаем сервер.
    console.log(`🚀  Server running at http://${app.get('host')}:${app.get('port')}`)
})
socketio.origins((origin, callback) => {
	if (origin.indexOf(`${process.env.WEBSITE_PROTOCOL}://${process.env.WEBSITE_DOMAIN}`) !== 0) {
		return callback('origin not allowed', false)
	}

	callback(null, true)
})
socketio.on('connection', socket => {
	// console.log('socket connected', socket.id)
    socket.on('graph.get_graph_data', (data, res) => onEvent(data, res, socket, backend.graph.getData))
})
socketio.use(socketIOSession(appSession))

socketio.origins((origin, callback) => {
	if (origin.indexOf(`${process.env.WEBSITE_PROTOCOL}://${process.env.WEBSITE_DOMAIN}`) !== 0) {
		return callback('origin not allowed', false)
	}

	callback(null, true)
})


const onEvent = async (data, res, socket, func, ...middlewares) => {
	makeContext({ user: makeUserProxy({ socket }), socket })
	for (let index in middlewares) {
		const check = await middlewares[index]()
		if (check !== true) return check
	}
	const result = await response(func)(data, res)
	return result
}

const response = func => async (data, res) => {
	let result
	try {
		result = await func(data)
	} catch (e) {
		console.log('Socket promise error', e)
		result = { status: ['error'] }
	}
	res && res(result)
}

const rolesAccepted = (...roles) => async () => {
	const currentUser = User.getCurrent()
	if (currentUser.isAuthenticated && (await currentUser.checkRoles(...roles))) return true
	return ['error', 'permissions denied']
}

const verifiedRequired = () => () => (User.getCurrent().verified ? true : ['error', 'verification required'])
