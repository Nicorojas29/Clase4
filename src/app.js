const express = require ('express');
const app = express()   //ejecucion de la funcion de arriba y el resultado es un objeto que lo va a tener en el const app
const PORT = process.env.PORT || 3000; // nuestra app escucha en el puerto 3 mil 
const alumnos = require('../datos/alumnos.json')

// definir un enpoint que es una ruta para hacer solicitudes
app.get('/alumnos' , (req, res)=> {
    res.json(alumnos ).status(200) // 200 codigo de respuesta cuando la solicitudes funcionan bien
})

/* recupero alumno con path parameters */
app.get('/alumnos/:dni',(req, res) => {
    const dni = req.params.dni
    const resultado = alumnos.find (alumno => alumno.dni == dni)
    if (resultado){
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El alumno con dni ${dni} no fue encontrado`} ).status(404)
    }

 })

app.delete ('/alumnos/:dni',(req, res) => {
     const dni = req.params.dni
     const indice = alumnos.findIndex (alumno => alumno.dni == dni)
     if (indice==-1) {
        res.status(404).json
        ( {
           resultado :"La operacion de borrado no pudo ser ejecutada",
           mensaje: `El alumno con ese dni ${dni} no fue encontrado`
        } 
        )
     } else {
        const alumno = alumnos[indice];
        const resultado = alumnos.splice(indice,1)
        res.status(200).json( {resultado:"La operacion de borrado pudo realizarse con exito",
                  alumno: alumno})
     }
})

app.listen(PORT, () => {console.log(`App lista escuchada en el puerto ${PORT} `) })  //listen es para escuchar la app 

