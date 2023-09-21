const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuarios, putUsuaros, patchUsuarios, deleteUsuarios } = require('../controllers/usuarios');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares')
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db_validators');



const router = Router();

router.get('/', getUsuarios );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password de contener mas de 6 caracteres').isLength({min: 6}),
    //check('correo', 'El email no es valido').isEmail(),
    check('correo').custom( existeEmail ),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
] , postUsuarios );

router.put('/:id',[
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
] , putUsuaros );

router.patch('/', patchUsuarios );

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteUsuarios)

module.exports = router;