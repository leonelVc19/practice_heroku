const AccessControl = require('accesscontrol');

const ac = new AccessControl();


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

    ac.grant('user')
        .readOwn('perfil')
        .readAny(['product']);

    ac.grant('admin')
        .extend('user') // hereda el rol de usuario
        .readAny('customer')// poder leer usuarios
        .createAny(['customer', 'product', 'user'])
        .updateAny(['customer', 'product', 'user']);
    
    
    ac.grant('super')
        .extend('admin')
        .deleteAny(['customer', 'product', 'user']);

    return ac;
};