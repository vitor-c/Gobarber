const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()
const UserController = require('./app/controller/UserController')
const SessionController = require('./app/controller/SessionController')
const DashboardController = require('./app/controller/DashboardController')
const Dash2Controller = require('./app/controller/Dash2Controller')
const FileController = require('./app/controller/FileController')
const AppointmentConstroller = require('./app/controller/AppointmentConstroller')
const AvailableController = require('./app/controller/AvailableController')
const authMiddlwares = require('./app/middlwares/auth')
const guestMiddlwares = require('./app/middlwares/guest')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.use('/app', authMiddlwares)
routes.get('/files/:file', FileController.show)

routes.get('/', guestMiddlwares, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddlwares, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)
routes.get('/app/dashboard2', Dash2Controller.index)

routes.get('/app/appointments/new/:provider', AppointmentConstroller.create)
routes.post('/app/appointments/new/:provider', AppointmentConstroller.store)

routes.get('/app/available/:provider', AvailableController.index)

module.exports = routes
