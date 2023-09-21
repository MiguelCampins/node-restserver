const { request, response, json } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async ( req = request, res = response, next) => {

    const token = req.header('token');

    if(!token){
        return res.status(400).json({
            msg: 'No existe token'
        })
    }
    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid)
        //Comprobar que existe el usuario 
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            })
        }

        //Comprobar que el usuario no esta borrado
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario estado: false'
            })
        }

        req.usuario = usuario

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}