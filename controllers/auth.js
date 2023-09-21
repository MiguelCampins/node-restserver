const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-JWT');

const login = async(req, res = response) => {

    const {correo, password} = req.body;

    try {
        
        //Comprobar que el email existe
        const usuario = await Usuario.findOne({ correo })
        if(!usuario){
            return res.status(400).json({
                msg: 'El Usuario y la contraseña no coinciden - Email'
            })
        }

        //Comprobar usuario activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El Usuario y la contraseña no coinciden - estado: false'
            })
        }

        //Comprobar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'El Usuario y la contraseña no coinciden - password'
            })
        }

        //Generar jwt
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
         })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Eror al iniciar sesion'
        })
    }
}

module.exports = {
    login
}