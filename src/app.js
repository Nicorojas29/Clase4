const express = require ('express');
const app = express()   //ejecucion de la funcion de arriba y el resultado es un objeto que lo va a tener en el const app
const PORT = process.env.PORT || 3000; // nuestra app escucha en el puerto 3 mil 

// definir un enpoint que es una ruta para hacer solicitudes
app.get('/alumnos' , (req, res)=> {
    res.json({mensaje: "Hola mundo desde alumnos", estado: "OK"} ).status(200) // 200 codigo de respuesta cuando la solicitudes funcionan bien
})

 app.listen(PORT, () => {console.log(`App lista escuchada en el puerto ${PORT} `) })     //listen es para escuchar la app 

