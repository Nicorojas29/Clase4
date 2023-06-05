const alumnos = require('../../datos/alumnos.json') // hago una referencia a const alumnos 

const getAllAlumnos =  (req, res)=> {
    res.json(alumnos ).status(200) 
}

// Recupero alumno con Path Parameters
const getAlumnoByDni = (req, res) => {
    const dni = req.params.dni
    const resultado = alumnos.find (alumno => alumno.dni == dni)
    if (resultado){
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El alumno con dni ${dni} no fue encontrado`} )
    }
}

const deleteAlumnoByDni = (req, res) => { // delete = eliminar 
    const dni = req.params.dni
    const indice = alumnos.findIndex (alumno => alumno.dni == dni) // finIndex sirve para devolver en que posicion esta el alumno
    if (indice==-1) {
       res.status(404).json(
        {
          resultado :"La operacion de borrado no pudo ser ejecutada",
          mensaje: `El alumno con ese dni ${dni} no fue encontrado`
       } 
      )
    } else {
       const alumno = alumnos[indice];
       const resultado = alumnos.splice(indice,1) // borramos uno despues del indice
       res.status(200)
       .json ( 
            {resultado:"La operacion de borrado pudo realizarse con exito",
                 alumno: alumno
            } 
        )
    }
}

const createAlumno = (req, res) =>{ // POST
    const alumnosData = req.body
    const existe = alumnos.find ( alumno => alumno.dni == alumnosData.dni)
    if (!existe) {
        if (!alumnosData.tieneCurso )
            alumnosData.tieneCurso = false
        if (!alumnosData.nombre) {
            res.status(400).json({mensaje: `No puedo generer el alumno con dni ${alumnosData.dni} por no tener nombre`}) 
        } else {
             alumnos.push(alumnosData)
             res.status(201).json({mensaje: `El alumno con dni ${alumnosData.dni} fue creado correctamente`}) 
        }
      } else {
        res.status(400).json({mensaje: `El alumno con dni ${alumnosData.dni} ya existe en la base de datos`}) 
     }
 }

 const updateAlumno = (req, res) => { //update es modificar osea es PUT 
    const dni = req.params.dni  // en la const tengo el num dni y en el cuerpo para modificar, es un path parameter
    const alumnosData = req.body
    const indice = alumnos.findIndex ( alumno => alumno.dni == dni) // se busca el indice con FinIndex
    if (indice >= 0 ){
        alumnos[indice].nombre = alumnosData.nombre
        alumnos[indice].tieneCurso = 
          (!alumnosData.tieneCurso) ? alumnosData.tieneCurso : alumnos[indice].tieneCurso
        res.status(201).json({"alumno": alumnos[indice]})
    }
    res.status(404).json
       ( {
          resultado :"La operacion de modificado no pudo ser realizada",
          mensaje: `El alumno con ese dni ${dni} no fue encontrado`
       } 
     )
 }
 /*
   alumnos[indice].nombre = alumnosData.nombre
        if (alumnosData.tieneCurso!==undefined) {
            alumnos[indice].tieneCurso = alumnosData.tieneCurso 
        }
        res.status(201).json({"alumno": alumnos[indice]})
    }
    else {
        res.status(404).
        json(
            {
                resultado: "La operación de modicar no pudo ser realizada",
                mensaje: `El alumno con dni ${dni} no fue encontrado`
            }
        )
    }
}
 */
module.exports ={ 
    getAllAlumnos,
    getAlumnoByDni,
    deleteAlumnoByDni,
    createAlumno,
    updateAlumno
}
    