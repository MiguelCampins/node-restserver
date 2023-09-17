const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuarios = async(req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;

    // const usuarios =  await Usuario.find({estado:true})
    //     .skip(Number(desde))
    //     .limit(limit)

    // const total = await Usuario.countDocuments({estado:true});

    //Pa lazar las dos promesas simultaneamente
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(limit)
    ])

    res.json({
        total,
        usuarios
    })
}

const postUsuarios = async(req, res) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );
    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en base de datos
    await usuario.save()

    res.json({
        usuario
    })
}

const putUsuaros = async(req, res = response) => {

    const { id } = req.params;
    //Solo se actualizara el ...resto los demas se excluyen
    const {_id, password, google, correo, ...resto } = req.body;
    
    //Validacion contra base de datos
    if( password ){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        usuario
    })
}

const patchUsuarios = (req, res) => {
    res.json({
        ok: true,
        msg: 'Peticion patch controller'
    })
}

const deleteUsuarios = async(req, res) => {

    const { id } = req.params;

    //Borrar usuario de la base de datos
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado logico de usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({
        usuario
    })
}


module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuaros,
    patchUsuarios,
    deleteUsuarios
}