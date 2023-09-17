const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${ rol } no existe`);
    }
}

const existeEmail = async( correo = '') => {
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
       throw new Error(`El email ya existe`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
       throw new Error(`El Id no existe`);
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}