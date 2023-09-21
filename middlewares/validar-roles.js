const { response } = require("express")


const esAdminRole = (req, res = response, next) => {

    if(!req.usuario) {
        return res.status(500).json({
            msg: 'Verificar rol sin validar token primero'
        })
    }

    const {rol} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'No eres administrador'
        })
    }
    next();
}

const tieneRole = ( ...roles ) => {

    return (req, res = response, next) => { 

        if(!req.usuario) {
            return res.status(500).json({
                msg: 'Verificar rol sin validar token primero'
            })
        }

        if( !roles.includes(req.usuario.rol)){
            return res.status(500).json({
                msg: `Necesitas tener uno de estos roles ${roles} `
            })
        }

        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}