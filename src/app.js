const express = require ('express');
const app = express()   //ejecucion de la funcion de arriba y el resultado es un objeto que lo va a tener en el const app
const PORT = process.env.PORT || 3000; // nuestra app escucha en el puerto 3 mil 
const alumnosRouter = require ('./routes/alumnos.route')
const aulasRouter = require ('./routes/aulas.routes')
const docentesRouter = require ('./routes/docentes.route')

app.use(express.json()) // a la app le permitimos usar json
app.use('/alumnos', alumnosRouter.router)
app.use('/aulas', aulasRouter.router)
app.use('/docentes', docentesRouter.router)

app.listen(PORT, () => {console.log(`App lista escuchada en el puerto ${PORT} `) })  //listen es para escuchar la app 

