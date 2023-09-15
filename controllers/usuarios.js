const { response, request } = require('express');

const getUsuarios = (req = request, res = response) => {

    const { id } = req.query

    res.json({
        ok: true,
        msg: 'Peticion get controller',
        id
    })
}

const postUsuarios = (req, res) => {

    const { nombre, edad } = req.body;

    res.json({
        ok: true,
        msg: 'Peticion post controller',
        nombre,
        edad
    })
}

const putUsuaros = (req, res) => {

    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'Peticion put controller',
        id
    })
}

const patchUsuarios = (req, res) => {
    res.json({
        ok: true,
        msg: 'Peticion patch controller'
    })
}

const deleteUsuarios = (req, res) => {
    res.json({
        ok: true,
        msg: 'Peticion delete controller'
    })
}


module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuaros,
    patchUsuarios,
    deleteUsuarios
}