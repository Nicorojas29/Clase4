const docentes = require('../../datos/docentes.json') // hago una referencia a const docentes

const getAllDocentes =  (req, res)=> {
    res.json(docentes).status(200) 
}

const getDocentesByLegajo = (req, res) => {
    const legajo = req.params.legajo
    const resultado = docentes.find (docente=> docente.legajo == legajo)
    if (resultado){
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El docente con ese legajo ${legajo} no fue encontrado`} )
    }
}

const deleteDocentesByLegajo = (req, res) => {
    const legajo = req.params.legajo
    const indice = docentes.findIndex (docente => docente.legajo == legajo)
    if (indice==-1) {
       res.status(404).json
       ( {
          resultado :"La operacion de borrado no pudo ser ejecutada",
          mensaje: `El docente con ese legajo ${legajo} no fue encontrado`
       } 
      )
    } else {
       const docente = docentes[indice];
       const resultado = docentes.splice(indice,1)
       res.status(200).json( {resultado:"La operacion de borrado pudo realizarse con exito",
                 docente: docente})
    }
}

const createDocentes = (req, res) =>{
    const docentesData = req.body
    const existe = docentes.find ( docente => docente.legajo == docentesData.legajo)
    if (!existe) {
        if (!docentesData.concursado )
            docentesData.concursado= false
        if (!docentesData.nombre) {
            res.status(400).json({mensaje: `No puedo generera el docente con legajo ${docentesData.legajo} por no tener nombre`}) 
        } else {
             docentes.push(docentesData)
             res.status(201).json({mensaje: `El docentes con legajo ${docentesData.legajo} fue creado correctamente`}) 
        }
      } else {
        res.status(400).json({mensaje: `El docente con legajo ${docentesData.legajo} ya existe en la base de datos`}) 
     }
 }

 const updateDocentes = (req, res) => { 
    const legajo = req.params.legajo 
    const docentesData = req.body
    const indice = docentes.findIndex ( docente => docente.legajo == legajo)
    if (indice >= 0 ){
        docentes[indice].nombre = docentesData.nombre
        docentes[indice].concursado = 
          (!docentesData.concursado) ? docentesData.concursado : docentes[indice].concursado
        res.status(201).json({"docente": docentes[indice]})
    }
    res.status(404).json
       ( {
          resultado :"La operacion de modificado no pudo ser realizada",
          mensaje: `El docente con ese legajo ${legajo} no fue encontrado`
       } 
     )
 }
module.exports ={ 
    getAllDocentes,
    getDocentesByLegajo,
    deleteDocentesByLegajo,
    createDocentes,
    updateDocentes
}
    