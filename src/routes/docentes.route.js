const express  = require('express')
const docentesControllers = require('../controllers/docentes.controller')

const router = express.Router() // a express le pido una ruta y lo almacene en la const router 

router.get('/', docentesControllers.getAllDocentes)
router.get ('/:legajo', docentesControllers.getDocentesByLegajo)
router.delete('/legajo', docentesControllers.deleteDocentesByLegajo )
router.post( '/', docentesControllers.createDocentes)
router.put('/:legajo',docentesControllers.updateDocentes)

module.exports = { router}