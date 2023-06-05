const express  = require('express')
const alumnosControllers = require('../controllers/alumnos.controller')

const router = express.Router() // a express le pido una ruta y lo almacene en la const router 

router.get('/', alumnosControllers.getAllAlumnos)
router.get ('/:dni', alumnosControllers.getAlumnoByDni)
router.delete('/:dni', alumnosControllers.deleteAlumnoByDni)
router.post( '/', alumnosControllers.createAlumno)
router.put('/:dni', alumnosControllers.updateAlumno) // Modifica


module.exports = { router}