const { Router } = require('express');
const { getUsuarios, postUsuarios, putUsuaros, patchUsuarios, deleteUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios );

router.post('/', postUsuarios );

router.put('/:id', putUsuaros );

router.patch('/', patchUsuarios );

router.delete('/', deleteUsuarios)

module.exports = router;