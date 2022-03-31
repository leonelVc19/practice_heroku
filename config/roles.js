const AccessControl = require('accesscontrol');

const ac = AccessControl();

/**
 * definir roles del más inferior al superior
 *  ninguno
 *    usuario
 *      admin
 *        super
 */

exports.roles = () => {
    ac.grant('ninguno');
    //Aqui los permisos de rol: niguno

    ac.grant('usuario')
        .readOwn('perfil')
        .readAny(['product']);

    ac.grant('admin')
        .extend('usuario') // hereda el rol de usuario
        .readAny('usuario')// poder leer usuarios
        .createAny(['customer', 'product', 'usuario'])
        .updateAny(['customer', 'product', 'usuario']);
    
    
    ac.grant('super')
        .extend('admin')
        .deleteAny(['customer', 'product', 'usuario']);

    return ac;
};